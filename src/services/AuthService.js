import {ApiService} from "./ApiService";
import {Toaster} from "../components/Toaster";

export async function auth(username, password) {
    try {
        const apiConfig = {
            uri: '/auth/login',
            request: {
                userName: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await ApiService.POST(apiConfig);
    } catch (error) {
        console.error(error);
        Toaster.error("Login failed");
    }
}

export async function logout() {
    localStorage.removeItem('accessToken');
    window.location.replace('/');
}

export function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
}