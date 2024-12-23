'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import Link from "next/link"
import { GoalCard } from "../components/goal-card"
import { Navbar } from "../components/navbar"
import { Search } from 'lucide-react'
import { FormEvent, useEffect, useState } from "react"
import { goalApi, Goal } from "@/lib/api/goal"; // Import the Goal type

export default function GoalsCatalog() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const fetchedGoals = await goalApi.getAllGoals();
                setGoals(fetchedGoals.filter(goal => goal.status === 'Approved')); // Only show approved goals
            } catch (err) {
                console.error("Error fetching goals:", err);
                setError("Failed to load goals. Please try again later.");
            }
        };
        fetchGoals();
    }, []);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search functionality here
        console.log("Search submitted");
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Discover Goals</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSearch} className="mb-8 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px] relative">
                        <Input
                            type="search"
                            placeholder="Search goals..."
                            className="w-full bg-neutral-800 text-slate-100 pr-10"
                        />
                        <Button 
                            type="submit" 
                            size="icon"
                            className="absolute right-0 top-0 bg-red-600 hover:bg-red-700"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <Select defaultValue="all" className="max-w-xs bg-neutral-800 text-slate-100">
                        <option value="all">All Categories</option>
                        <option value="business">Business</option>
                        <option value="culinary">Culinary</option>
                        <option value="fitness">Fitness</option>
                        <option value="arts">Arts</option>
                        <option value="technology">Technology</option>
                    </Select>
                    <Select defaultValue="all" className="max-w-xs bg-neutral-800 text-slate-100">
                        <option value="all">All Prices</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </Select>
                    <Select defaultValue="all" className="max-w-xs bg-neutral-800 text-slate-100">
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="popular">Popular</option>
                    </Select>
                    <Select defaultValue="relevance" className="max-w-xs bg-neutral-800 text-slate-100">
                        <option value="relevance">Sort by Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </Select>
                </form>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
            </main>
        </div>
    )
}