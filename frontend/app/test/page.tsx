// frontend/src/app/test/page.tsx
'use client';

import { useState } from 'react';
import { getRandomNumber } from '@/lib/api/test';

export default function TestPage() {
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchNumber = async () => {
        setLoading(true);
        setError(null);
        try {
            const number = await getRandomNumber();
            setRandomNumber(number);
        } catch (err) {
            setError('Failed to fetch random number');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Random Number Test</h1>
            
            <button
                onClick={handleFetchNumber}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? 'Loading...' : 'Get Random Number'}
            </button>

            {randomNumber !== null && (
                <div className="mt-4 text-xl">
                    Random Number: {randomNumber}
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}