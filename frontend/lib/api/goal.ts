import axiosInstance from './axios';

export interface Goal {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    author: string;
    status: string; // e.g., "Approved", "Pending", etc.
    createdAt?: string; // Optional, if you want to track when the goal was created
    guidePath?: string; // Path to the uploaded guide file
    coverPath?: string; // Path to the uploaded cover image
}

export const goalApi = {
    createGoal: async (data: FormData): Promise<void> => {
        const response = await axiosInstance.post('/goals', data);
        return response.data; // Adjust based on your backend response
    },

    getAllGoals: async (): Promise<Goal[]> => {
        const response = await axiosInstance.get('/goals');
        return response.data; // Assuming the response is an array of goals
    },

    getGoalById: async (id: number): Promise<Goal> => {
        const response = await axiosInstance.get(`/goals/${id}`);
        return response.data; // Assuming the response is a single goal object
    },

    updateGoalStatus: async (goalId: number, status: string): Promise<void> => {
        const response = await axiosInstance.patch(`/goals/${goalId}/status`, { status });
        return response.data; // Adjust based on your backend response
    },
};