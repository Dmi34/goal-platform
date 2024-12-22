'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Navbar } from "../components/navbar"
import { Github, Mail } from 'lucide-react'
import { useState } from 'react';

import { useAuth } from '@/src/context/AuthContext';
import { authApi } from '@/lib/api/auth';

export default function AuthPage() {
  const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('login-email') as string;
        const password = formData.get('login-password') as string;

        try {
            const response = await authApi.login({ email, password });
            login(response.token);
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const registerData = {
            firstname: formData.get('register-name') as string,
            lastname: formData.get('register-name') as string,
            email: formData.get('register-email') as string,
            password: formData.get('register-password') as string
        };

        try {
            const response = await authApi.register(registerData);
            login(response.token);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full overflow-hidden rounded-xl bg-neutral-800">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-700 p-1">
              <TabsTrigger 
                value="login" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4 p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="login-email"
                      name="login-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="login-password"
                      name="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember-me" />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link href="/forgot-password" className="text-red-500 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 rounded-lg">
                    Sign In
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-neutral-800 px-2 text-neutral-400">Or continue with</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full bg-neutral-700 hover:bg-neutral-600 rounded-lg">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                  <Button variant="outline" className="w-full bg-neutral-700 hover:bg-neutral-600 rounded-lg">
                    <Mail className="mr-2 h-4 w-4" /> Google
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-4 p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label htmlFor="register-name" className="block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="register-name"
                      name="register-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="register-email"
                      name="register-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="register-password"
                      name="register-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium">
                      Confirm Password
                    </label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="mt-1 w-full bg-neutral-700 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-red-500 hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 rounded-lg">
                    Create Account
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-neutral-800 px-2 text-neutral-400">Or continue with</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full bg-neutral-700 hover:bg-neutral-600 rounded-lg">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                  <Button variant="outline" className="w-full bg-neutral-700 hover:bg-neutral-600 rounded-lg">
                    <Mail className="mr-2 h-4 w-4" /> Google
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

