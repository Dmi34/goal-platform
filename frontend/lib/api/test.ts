// frontend/src/lib/api/test.ts

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const getRandomNumber = async (): Promise<number> => {
    try {
        const response = await axios.get(`${API_URL}/test/random`);
        return response.data.number;
    } catch (error) {
        console.error('Error fetching random number:', error);
        throw error;
    }
};