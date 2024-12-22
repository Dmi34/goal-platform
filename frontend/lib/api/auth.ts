// frontend/src/lib/api/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        console.log('Sending registration data:', data); // Debug log
        
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response.data;
    }
};