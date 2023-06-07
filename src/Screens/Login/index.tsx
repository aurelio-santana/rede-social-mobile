import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext"; 
import { Text } from "react-native";

import { styles } from "./styles";

import { AuthForm } from "../../components/AuthForm";
import { Spacer } from "../../components/Spacer";


function Login({ navigation }) {

const { login, errorMessage } = useContext(AuthContext);

    return (
        <>
            <AuthForm 
                authFormSubtitle="Faça o login e comece a usar!"
                submitFormButtonText="Entrar"
                //routeName="/signup"
                submitFormButtonAction={login}
            />
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
            </TouchableOpacity>
            {errorMessage && (
                <Spacer>
                    <Text style={styles.error}>{errorMessage}</Text>
                </Spacer>
            )}
        </>
    );
}

export default Login;











