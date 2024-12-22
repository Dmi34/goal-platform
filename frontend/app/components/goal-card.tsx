'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import Image from "next/image"
import Link from "next/link"

interface GoalCardProps {
  goal: {
    id: number
    title: string
    description: string
    image: string
    price: number
    rating: number
    author: string
  }
}

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <Card className="overflow-hidden bg-neutral-800 text-slate-100">
      <Image
        src={goal.image}
        alt={goal.title}
        width={400}
        height={200}
        className="h-48 w-full object-cover"
      />
      <CardContent className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{goal.title}</h3>
        <p className="mb-2 text-sm text-slate-300">{goal.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${goal.price.toFixed(2)}</span>
          <StarRating rating={goal.rating} />
        </div>
      </CardContent>
      <CardFooter className="border-t border-neutral-700 p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-slate-300">By {goal.author}</span>
          <Link href={`/goals/${goal.id}`}>
            <span className="text-sm font-semibold text-red-500 hover:underline">
              View Details
            </span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

