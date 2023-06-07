import React, { ReactNode, useReducer} from "react";
import { Auth, UserToken } from "../Model/Auth";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import api from "../../services/api";
import { navigate } from "../RootNavigation";

interface AuthContext {
    token: string;
    userId: string;
    email: string;
    name: string;
    errorMessage: string;
    isLoading: boolean;
    login?: () => void;
    tryLocalLogin?: () => void;
    register?: () => void;
    logout?: () => void;
};

const defaultValue = {
    token: "",
    userId: "",
    email: "",
    name: "",
    errorMessage: "",
    isLoading: true,
};

const Context = React.createContext<AuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode}) => {
    const reducer = (state, action) => {
        switch(action.type) {
            case "login":
                return {
                    ... state,
                    ... action.payload,
                    errorMessage: "",
                };
            case "add_error":
                return {
                    ... state,
                    errorMessage: action.payload,
                    isLoading: false,
                };
            case "user_created":       
                return { ... state, errorMessage: "", ... action.payload };
            case "logout":
                return { token: "", userId: "", email: "", name: "", errorMessage: "", isLoading: false };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue);
    const login = async (auth: Auth) => {
            try {

                const { data } = await api.post("/authentication", auth);
                const userId = data.userId;
            
                await SecureStore.setItemAsync("token", data.token);
                await SecureStore.setItemAsync("userId", userId);
                await SecureStore.setItemAsync("email", auth.email);

                let name;
                if (data.token != null) {
                    const { data } = await api.get("/user/get", {params: {email: auth.email}});
                    await SecureStore.setItemAsync("name", data.name);
                    name = data.name;
                }

                dispatch({
                    type: "login",
                    payload: { 
                        token: data.token,
                        userId: data.userId,
                        email: auth.email,
                        name: name,
                        isLoading: false,
                    }
                });

            } catch(err) {
                console.log(err);
                dispatch({
                    type: "add_error",
                    payload: "Houve um erro no login."
                });
            }
    };

    const tryLocalLogin = async () => {
        try {
            console.log("tryLocalLogin");
            const token = await SecureStore.getItemAsync("token");
            const userId = await SecureStore.getItemAsync("userId");
            const email = await SecureStore.getItemAsync("email");
            const name = await SecureStore.getItemAsync("name");

            dispatch({ type: "login",
                payload: {
                    token,
                    userId: userId,
                    email: email,
                    name: name,
                    //profile,
                    //user,
                    isLoading: false,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    const register = async(auth: Auth) => {
        try {
            await api.post("/user/create", auth);
            dispatch({
                type: "user_created",
                isLoading: false,
            });
        } catch (err) {
            dispatch({
                type: "add_error",
                payload: "Houve um erro no cadastro.",
            });
        }
        navigate("Login");
    };

    const logout = async() => {
        try {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("userId");
            await SecureStore.deleteItemAsync("email");
            await SecureStore.deleteItemAsync("name");

            dispatch({
                type: "logout"
            });
        } catch (err) {
            console.log("logout :", err);
        }
    };
    

    return (
        <Context.Provider
            value={{
                ... state,
                login,
                tryLocalLogin,
                register,
                logout,
            }}
        >
            {children}
        </Context.Provider>
    );

};

export { Provider, Context };