import { Button } from "@/components/ui/button"
import { Navbar } from "../../components/navbar"
import { StarRating } from "../../components/star-rating"
import Link from "next/link"
import Image from "next/image"

const goal = {
  id: 1,
  title: "Launch a Successful Tech Startup",
  description: "From idea to IPO: A comprehensive guide to building a unicorn in Silicon Valley. This course covers everything from ideation and market validation to securing funding and scaling your business. Learn from real-world case studies, get insider tips on pitching to VCs, and master the art of building a world-class team. By the end of this guide, you'll have the knowledge and confidence to turn your tech dreams into a billion-dollar reality.",
  image: "/placeholder.svg?height=400&width=600",
  price: 299.99,
  rating: 4.8,
  author: {
    name: "Elon Musk Jr.",
    bio: "Serial entrepreneur with 3 successful exits. Y Combinator alum and advisor to top Silicon Valley startups.",
    image: "/placeholder.svg?height=100&width=100",
  },
  category: "Business",
  status: "popular",
  reviews: [
    { id: 1, user: "TechFounder23", rating: 5, comment: "This guide was instrumental in helping me secure my Series A funding. Highly recommended!" },
    { id: 2, user: "StartupDreamer", rating: 4, comment: "Comprehensive and practical. Wish I had found this sooner in my entrepreneurial journey." },
  ],
}

const similarGoals = [
  { id: 2, title: "Master Growth Hacking for Startups", price: 149.99 },
  { id: 3, title: "Venture Capital 101: Secure Your First Round", price: 199.99 },
  { id: 4, title: "Building a Stellar Startup Team", price: 99.99 },
]

export default function GoalDetails() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Image
              src={goal.image}
              alt={goal.title}
              width={600}
              height={400}
              className="mb-4 rounded-lg"
            />
            <h1 className="mb-2 text-3xl font-bold">{goal.title}</h1>
            <div className="mb-4 flex items-center gap-2">
              <StarRating rating={goal.rating} />
              <span>({goal.rating})</span>
            </div>
            <p className="mb-6 text-lg">{goal.description}</p>
            <h2 className="mb-2 text-2xl font-semibold">What You'll Learn</h2>
            <ul className="mb-6 list-inside list-disc">
              <li>Validate your startup idea and find product-market fit</li>
              <li>Develop a compelling pitch deck and business plan</li>
              <li>Navigate the complex world of venture capital and fundraising</li>
              <li>Build and scale a high-performing team</li>
              <li>Implement growth hacking strategies for rapid user acquisition</li>
            </ul>
            <h2 className="mb-2 text-2xl font-semibold">Reviews</h2>
            <div className="space-y-4">
              {goal.reviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-neutral-800 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">{review.user}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="sticky top-20 rounded-lg bg-neutral-800 p-6 space-y-4">
              <Button variant="outline" className="w-full border-red-600/20 text-red-500 hover:bg-red-600/10 hover:text-slate-100">Contact Author</Button>
              <div className="text-3xl font-bold">${goal.price}</div>
              <div className="flex items-center gap-4">
                <Image
                  src={goal.author.image}
                  alt={goal.author.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{goal.author.name}</h3>
                  <p className="text-sm text-slate-300">{goal.author.bio}</p>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">Purchase Goal</Button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Similar Goals</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {similarGoals.map((similarGoal) => (
              <Link href={`/goals/${similarGoal.id}`} key={similarGoal.id} className="block rounded-lg bg-neutral-800 p-4 transition-colors hover:bg-neutral-700">
                <h3 className="mb-2 font-semibold">{similarGoal.title}</h3>
                <p className="text-lg font-bold">${similarGoal.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

