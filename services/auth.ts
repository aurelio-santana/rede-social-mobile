import * as SecureStore from "expo-secure-store";

async function getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return authHeader;
}

async function getUserId() {
    const userId = await SecureStore.getItemAsync("userId");

    return userId;
}

async function getEmail() {
    const email = await SecureStore.getItemAsync("email");

    return email;
}

async function getName() {
    const name = await SecureStore.getItemAsync("name");

    return name;
}

export { getAuthHeader, getUserId, getEmail, getName };