'use client'

import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { goalApi } from "@/lib/api/goal"; // Ensure this import is correct

const platformMetrics = [
  { name: 'Users', value: 5000 },
  { name: 'Goals', value: 1200 },
  { name: 'Sales', value: 8500 },
  { name: 'Revenue', value: 50000 },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
];

const categories = [
  { id: 1, name: 'Technology', goalCount: 150 },
  { id: 2, name: 'Business', goalCount: 200 },
  { id: 3, name: 'Health & Fitness', goalCount: 100 },
];

export default function AdminPanel() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [goalsForModeration, setGoalsForModeration] = useState([]);

  useEffect(() => {
    const fetchGoalsForModeration = async () => {
      try {
        const fetchedGoals = await goalApi.getAllGoals(); // Fetch all goals
        setGoalsForModeration(fetchedGoals.filter(goal => goal.status === 'Pending')); // Filter for pending goals
      } catch (error) {
        console.error("Error fetching goals for moderation:", error);
      }
    };
    fetchGoalsForModeration();
  }, []);

  const handleApprove = async (goalId) => {
    try {
      await goalApi.updateGoalStatus(goalId, 'Approved'); // Update status in the database
      setGoalsForModeration(prevGoals => prevGoals.filter(goal => goal.id !== goalId)); // Remove approved goal from the list
      console.log('Approved goal:', goalId);
    } catch (error) {
      console.error('Failed to approve goal:', error);
    }
  };

  const handleReject = async (goalId) => {
    try {
      await goalApi.updateGoalStatus(goalId, 'Rejected'); // Update status in the database
      setGoalsForModeration(prevGoals => prevGoals.filter(goal => goal.id !== goalId)); // Remove rejected goal from the list
      console.log('Rejected goal:', goalId);
    } catch (error) {
      console.error('Failed to reject goal:', error);
    }
  };

  const toggleGoalDescription = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Admin Panel</h1>
        <Tabs defaultValue="metrics" className="space-y-4">
          <TabsList className="bg-neutral-800 p-1 rounded-xl inline-flex">
            <TabsTrigger value="metrics" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all">Platform Metrics</TabsTrigger>
            <TabsTrigger value="goals" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all">Goals Moderation</TabsTrigger>
            <TabsTrigger value="users" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all">User Management</TabsTrigger>
            <TabsTrigger value="categories" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all">Category Management</TabsTrigger>
            <TabsTrigger value="settings" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all">System Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="metrics">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {platformMetrics.map((metric) => (
                    <Card key={metric.name} className="bg-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-300">{metric.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-red-500">{metric.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="goals">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Goals Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Title</TableHead>
                      <TableHead className="text-slate-300">Author</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {goalsForModeration.map((goal) => (
                      <React.Fragment key={goal.id}>
                        <TableRow onClick={() => toggleGoalDescription(goal.id)}>
                          <TableCell className="text-slate-100">
                            {goal.title}
                            {expandedGoal === goal.id ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />}
                          </TableCell>
                          <TableCell className="text-slate-100">{goal.author}</TableCell>
                          <TableCell className="text-slate-100">{goal.status}</TableCell>
                          <TableCell>
                            {goal.status === 'Pending' ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mr-2 bg-green-600 text-white border-green-600 hover:bg-green-700"
                                  onClick={(e) => { e.stopPropagation(); handleApprove(goal.id); }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-600 text-white border-red-600 hover:bg-red-700"
                                  onClick={(e) => { e.stopPropagation(); handleReject(goal.id); }}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <span className={goal.status === 'Approved' ? 'text-green-500' : 'text-red-500'}>
                                {goal.status}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                        {expandedGoal === goal.id && (
                          <TableRow>
                            <TableCell colSpan={4} className="bg-neutral-700 text-slate-300">
                              <p className="py-2">{goal.description}</p>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-slate-100">{user.name}</TableCell>
                        <TableCell className="text-slate-100">{user.email}</TableCell>
                        <TableCell className="text-slate-100">{user.role}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                            onClick={() => handleEditUser(user.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 text-white border-red-600 hover:bg-red-700"
                            onClick={() => handleBlockUser(user.id)}
                          >
                            Block
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Category Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="New Category Name"
                    className="bg-neutral-700 border-neutral-600 text-slate-100 flex-1"
                  />
                  <Button className="bg-orange-600 hover:bg-orange-700">Add Category</Button>
                </div>
                <Table className="w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Goal Count</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="text-slate-100">{category.name}</TableCell>
                        <TableCell className="text-slate-100">{category.goalCount}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-orange-600 text-white border-orange-600 hover:bg-orange-700"
                            onClick={() => handleEditCategory(category.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 text-white border-red-600 hover:bg-red-700"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="maintenance-mode" className="text-slate-300">Maintenance Mode</label>
                    <Switch
                      id="maintenance-mode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                      className="bg-neutral-600 data-[state=checked]:bg-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-name" className="text-slate-300">Site Name</label>
                    <Input id="site-name" placeholder="GoalHub" className="bg-neutral-700 border-neutral-600 text-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-slate-300">Contact Email</label>
                    <Input id="contact-email" type="email" placeholder="contact@goalhub.com" className="bg-neutral-700 border-neutral-600 text-slate-100" />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}