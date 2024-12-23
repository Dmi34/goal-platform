'use client';

import { useState, useEffect } from 'react';
import { goalApi } from '@/lib/api/goal';

export default function TestPage() {
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGoals = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedGoals = await goalApi.getAllGoals();
            setGoals(fetchedGoals);
        } catch (err) {
            setError('Failed to fetch goals');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Goals List</h1>
            
            <button
                onClick={fetchGoals}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? 'Loading...' : 'Refresh Goals'}
            </button>

            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}

            <div className="mt-4 text-lg">
                <pre className="" >{JSON.stringify(goals, null, 2)}</pre>
            </div>
        </div>
    );
}