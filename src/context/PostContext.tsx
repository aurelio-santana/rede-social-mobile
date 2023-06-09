import React, { ReactNode, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Post } from "../Model/Post";
import api from "../../services/api";
import { navigate } from "../RootNavigation";
import { getAuthHeader, getEmail, getName, getUserId } from "../../services/auth";

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
            const userId = await getUserId();           
            const { data } = await api.get("/post/feed", {params: {userId: userId}});
            dispatch({ type: "show_posts", payload: data.posts[0] });
        } catch (err) {
            alert("Erro ao obter o Feed.");
        }
    };

    const likePost = async ({ postId }) => {
        try {
            const userId = await getUserId();
            api.put(`/post/${postId}/like?userId=${userId}`);
            dispatch({
                type: "like_post",
                payload: { id: postId, userId },
            });
        } catch (err) {}
    };

    const unlikePost = async ({postId}) => {
        try {
            const userId = await getUserId();
            api.put(`/post/${postId}/like?userId=${userId}`);
            dispatch({
                type: "unlike_post",
                payload: { id: postId, userId },
            });
        } catch (err) {}
    };

    const createPost = async ({ title, content, image }) => {
        try {
            const userId = await getUserId(); 
            let formData;
            if (image) {
                formData = {
                    title: title,
                    content: content || "",
                    userId: userId,
                    fileList: image
                };
                } else {
                    formData = {
                    title: title,
                    content: content,
                    userId: userId,
                    }
                }
            const name = await getName();
            const { data } = await api.post("/post/create", formData);
            const newPost = await api.get("/post/get", {params: {id: data}});

            if (state.posts == undefined) {
                state.posts = [] as Post[];
            }
            
            dispatch({
                type: "create_post",
                payload: { ... newPost.data, name: name }
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