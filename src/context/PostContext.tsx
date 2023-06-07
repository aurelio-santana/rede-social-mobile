import React, { ReactNode, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Post } from "../Model/Post";
import api from "../../services/api";
import { navigate } from "../RootNavigation";
import { getAuthHeader, getEmail, getName, getUserId } from "../../services/auth"; //getProfile


interface PostContext {
    posts: Post[];
    getPosts?: () => void;
    likePost?: ({ postId }: { postId: string }) => void;
    unlikePost?: ({ postId }: { postId: string }) => void;
    createPost?: ({title, content, image}) => void;
}

const defaultValue = {
    posts: [],
};


const Context = React.createContext<PostContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state, action) => {
        switch(action.type) {
            case "show_posts":
                return {
                    ... state,
                    posts: action.payload,
                };

            case "like_post":
                const newPostsLike = state.posts;
                const [postLiked, ... _] = newPostsLike.filter(
                    (post) => post.id == action.payload.id
                );
                console.log("postid1", action.payload.id);
                postLiked.like.push(action.payload.userId);    
                return { posts: [ ... newPostsLike] };

            case "unlike_post":
                const newPostsUnlike = state.posts;
                const [postUnliked, ... rest] = newPostsUnlike.filter(
                    (post) => post.id == action.payload.id
                );
                const index = postUnliked.like.indexOf(action.payload.userId);
                postUnliked.like.splice(index, 1);  
                return { posts: [ ... newPostsUnlike] };

            case "create_post":
                return { posts: [action.payload, ... state.posts] };
            
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue);

    const getPosts = async () => {
        try {
            //const authHeader = await getAuthHeader();
            const userId = await getUserId();
            

            const { data } = await api.get("/post/feed", {params: {userId: userId}});
            console.log("pposts",data.posts[0]);
            //const { data } = await api.get("/feed", authHeader);

            dispatch({ type: "show_posts", payload: data.posts[0] });

        } catch (err) {
            alert("Erro ao obter o Feed.");
        }
    };

    const likePost = async ({ postId }) => {
        console.log("post id", postId);
        try {
            //const authHeader = await getAuthHeader();
            //await api.post(`/posts/${postId}/like`, null, authHeader);
            const userId = await getUserId();

            api.put(`/post/${postId}/like?userId=${userId}`);
            console.log("passou aqui");
            dispatch({
                type: "like_post",
                payload: { id: postId, userId },
            });

        } catch (err) {}
    };

    const unlikePost = async ({postId}) => {
        try {
            //const authHeader = await getAuthHeader();
            const userId = await getUserId();
            api.put(`/post/${postId}/like?userId=${userId}`);
            console.log("passou aqui");
            dispatch({
                type: "unlike_post",
                payload: { id: postId, userId },
            });

        } catch (err) {}
    };

    const createPost = async ({ title, content, image }) => {
        try {
            //const authHeader = await getAuthHeader();
            const token = await SecureStore.getItemAsync("token");
            //const user = await getUser();
            const userId = await getUserId();
            const email = await getEmail();
            
            const xformData = new FormData();
            xformData.append("title", title);
            xformData.append("content", content || "");
            xformData.append("userId", userId);
            //formData.append("file", image);

            /* const data = await api.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });  */

            let formData;
            if (image) {
                console.log("com file");
                formData = {
                    title: title,
                    content: content || "",
                    userId: userId, //TODO authHeader
                    file: image
                };
                } else {
                    console.log("sem file");
                    formData = {
                    title: title,
                    content: content,
                    userId: userId, //TODO authHeader
                    }
                }






            console.log("formdata", formData);
            const name = await getName();
            const { data } = await api.post("/post/create", formData);
            const newPost = await api.get("/post/get", {params: {id: data}});
            console.log("create data", newPost.data);

            
            /* const  { data } = await api.post("/posts", formData, authHeader); */
            
            dispatch({
                type: "create_post",
                payload: { ... newPost.data, name: name },
            });
            navigate("PostList");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <Context.Provider
            value={{
                ... state,
                getPosts,
                likePost,
                unlikePost,
                createPost,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export { Provider, Context };