// frontend/src/lib/api/profile.ts
import axiosInstance from './axios';


export interface ProfileData {
    bio: string;
    phoneNumber: string;
    address: string;
    email: string;
    userSettings: {
        // add any settings fields if needed
    };
}


export const profileApi = {
    getCurrentProfile: async (): Promise<ProfileData> => {
        const response = await axiosInstance.get('/profiles/me');
        return response.data;
    },

    updateProfile: async (data: Partial<ProfileData>): Promise<ProfileData> => {
        const response = await axiosInstance.put('/profiles/me', data);
        return response.data;
    }
};