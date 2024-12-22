// frontend/src/lib/api/profile.ts
import axiosInstance from './axios';


export interface ProfileData {
    bio: string;
    phoneNumber: string;
    address: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar?: string;
    user: {
        firstname: string;
        lastname: string;
    };
    userSettings: {
        notificationsEnabled: boolean;
        publicProfile: boolean;
        twoFactorEnabled: boolean;
    };
}


export const profileApi = {
    getCurrentProfile: async (): Promise<ProfileData> => {
        const response = await axiosInstance.get('/profiles/me');
        return response.data;
    },

    updateProfile: async (data: Partial<ProfileData>): Promise<ProfileData> => {
        const response = await axiosInstance.put('/profiles/me', data);
        console.log("Returned data: ", response.data);
        return response.data;
    },

    changePassword: async (data: { currentPassword: string; newPassword: string }) => {
        const response = await axiosInstance.put('/profiles/change-password', data);
        return response.data;
    },

    uploadAvatar: async (data: FormData): Promise<string> => {
        const response = await axiosInstance.post('/profiles/upload-avatar', data);
        return response.data; // Return the file path or URL
    },
};