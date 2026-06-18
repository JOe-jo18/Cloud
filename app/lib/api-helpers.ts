import axios from 'axios';
import { LoginResponse } from './types';

// API route
const BACKEND_API = "https://api-phase-one.vercel.app";

const api = axios.create({
    baseURL: BACKEND_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get data generic
export async function getData<T>(url: string) {
    const response = await api.get<T>(url);
    return response.data;
}

// Post data generic
export async function postData<T>(url: string, body: unknown) {
   const response = await api.post<T>(url, body);
   return response.data;
}

export async function putData<T>(url: string, body: unknown) {
    const response = await api.put<T>(url, body);
    return response.data;
}

// Sign Up helper
export async function signupUser(username: string, email: string, password: string) {
return postData('/routes/signup', { username, email, password});
}

// Login helper
export async function loginUser(username: string, password: string): Promise<LoginResponse> {
    return postData<LoginResponse>('/routes/login', { username, password });
}


export async function resetPassword(email: string, newPassword: string): Promise<{ message?: string }> {
    return putData<{ message?: string }>('/routes/forgetpassword', { email, newPassword });
}