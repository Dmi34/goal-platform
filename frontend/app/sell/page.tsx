'use client'

import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { goalApi } from "@/lib/api/goal"; // Import the new goal API module
import { useRouter } from "next/navigation";

export default function SellGoal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [guideFile, setGuideFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('edit'); // State to manage active tab
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('goal', JSON.stringify({ 
      title, 
      description, 
      price, 
      userId: 1, // Assuming userId is 1 for demo
      status: 'Pending'
    }));
    if (guideFile) formData.append('guide', guideFile);
    if (coverFile) formData.append('cover', coverFile);

    try {
      await goalApi.createGoal(formData); // Use the new goal API module
      router.push('/goals'); // Redirect to goals page after successful creation
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Create/Edit Goal</h1>
        <Card className="bg-neutral-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-amber-400">Goal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-300">Title</Label>
                <Input id="title" className="bg-neutral-700 border-neutral-600 text-slate-100" placeholder="Enter goal title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-300">Description</Label>
                <Textarea id="description" className="bg-neutral-700 border-neutral-600 text-slate-100" placeholder="Describe your goal" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-slate-300">Category</Label>
                <Select>
                  <SelectTrigger className="bg-neutral-700 border-neutral-600 text-slate-100">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    <SelectItem value="business" className="text-slate-100 hover:bg-neutral-700">Business</SelectItem>
                    <SelectItem value="technology" className="text-slate-100 hover:bg-neutral-700">Technology</SelectItem>
                    <SelectItem value="health" className="text-slate-100 hover:bg-neutral-700">Health & Fitness</SelectItem>
                    <SelectItem value="arts" className="text-slate-100 hover:bg-neutral-700">Arts & Crafts</SelectItem>
                    <SelectItem value="education" className="text-slate-100 hover:bg-neutral-700">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guide" className="text-sm font-medium text-slate-300">Guide Upload</Label>
                <div className="flex items-center space-x-2">
                  <Input id="guide" type="file" className="hidden" onChange={(e) => setGuideFile(e.target.files[0])} />
                  <Button
                    onClick={() => document.getElementById('guide')?.click()}
                    variant="outline"
                    className="bg-neutral-700 text-slate-200 border-neutral-600 hover:bg-white hover:text-orange-500 transition-colors"
                  >
                    Choose File
                  </Button>
                  <span className="text-sm text-slate-400">{guideFile ? guideFile.name : 'No file chosen'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-slate-300">Price</Label>
                <Input id="price" type="number" className="bg-neutral-700 border-neutral-600 text-slate-100" placeholder="Set your price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover" className="text-sm font-medium text-slate-300">Cover Image</Label>
                <div className="flex items-center space-x-2">
                  <Input id="cover" type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files[0])} />
                  <Button
                    onClick={() => document.getElementById('cover')?.click()}
                    variant="outline"
                    className="bg-neutral-700 text-slate-200 border-neutral-600 hover:bg-white hover:text-orange-500 transition-colors"
                  >
                    Choose Image
                  </Button>
                  <span className="text-sm text-slate-400">{coverFile ? coverFile.name : 'No image chosen'}</span>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="bg-neutral-700 text-slate-200 border-neutral-600 hover:bg-white hover:text-orange-500 transition-colors"
            >
              Save Draft
            </Button>
            <Button type="submit" onClick={handleSubmit} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
              Publish Goal
            </Button>
          </CardFooter>
        </Card>
        <Tabs defaultValue="edit" className="mt-8">
          <TabsList className="bg-neutral-900">
            <TabsTrigger value="edit" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Edit</TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            {/* The form is already visible, so we don't need to repeat it here */}
          </TabsContent>
          <TabsContent value="preview">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-orange-400">Goal Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-100">{title || 'Your Goal Title'}</h2>
                <p className="text-sm text-slate-400">Category: Your Selected Category</p>
                <p className="text-slate-300">{description || 'Your goal description will appear here...'}</p>
                <p className="text-lg font-bold text-red-400">Price: ${price || 0}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}