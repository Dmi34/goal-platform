'use client'

import { Navbar } from "../components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const createdGoals = [
  { id: 1, title: "Launch a Tech Startup", status: "accepted" },
  { id: 2, title: "Master Sourdough Baking", status: "pending" },
  { id: 3, title: "Run a Marathon", status: "declined" },
]

const purchasedGuides = [
  { id: 1, title: "Effective Time Management", price: 29.99 },
  { id: 2, title: "Advanced Python Programming", price: 49.99 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$12,345.67</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Guides Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">56,789</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Published Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-neutral-800 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-red-400">Sales Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Bar dataKey="sales" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-amber-400">Created Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-300">Title</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {createdGoals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="text-slate-100">{goal.title}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            goal.status === 'accepted' ? 'bg-green-500' :
                            goal.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }
                        >
                          {goal.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-400">Purchased Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-300">Title</TableHead>
                    <TableHead className="text-slate-300">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasedGuides.map((guide) => (
                    <TableRow key={guide.id}>
                      <TableCell className="text-slate-100">{guide.title}</TableCell>
                      <TableCell className="text-slate-100">${guide.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

