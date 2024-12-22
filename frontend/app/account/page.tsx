'use client'

import { useState, useEffect } from 'react'
import { Navbar } from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { profileApi, type ProfileData } from '@/lib/api/profile'

export default function UserProfile() {
  const [telegramConnected, setTelegramConnected] = useState(false)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [publicProfile, setPublicProfile] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await profileApi.getCurrentProfile()
      setProfile(data)
      setNotificationsEnabled(data.userSettings?.notificationsEnabled || false)
      setPublicProfile(data.userSettings?.publicProfile || false)
      setTwoFactorEnabled(data.userSettings?.twoFactorEnabled || false)
    } catch (err) {
      setError('Failed to load profile data')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePersonalInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullname') as string;
    const [firstname, lastname] = fullName.split(' ');
    console.log("Updating here: ", firstname + " " + lastname);
    const updateData: any = {
        user: {
            firstname: firstname || '',
            lastname: lastname || '',
        },
        bio: formData.get('bio') as string,
        email: formData.get('email') as string,
        avatar: undefined, // Initialize avatar as undefined
        userSettings: {
            notificationsEnabled,
            publicProfile,
            twoFactorEnabled,
        }
    };

    // Handle avatar upload
    if (avatarFile) {
        const avatarData = new FormData();
        avatarData.append('file', avatarFile);
        try {
            const avatarPath = await profileApi.uploadAvatar(avatarData);
            updateData.avatar = avatarPath; // Store the path of the uploaded file
        } catch (err) {
            setError('Failed to upload avatar');
            console.error(err);
            return; // Exit if avatar upload fails
        }
    }

    try {
        const updatedProfile = await profileApi.updateProfile(updateData);
        setProfile(updatedProfile);
        setAvatarFile(null); // Reset the avatar file after upload
    } catch (err) {
        setError('Failed to update profile');
        console.error(err);
    }
};

const handleProfileSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

  const updateData = {
      user: {
          firstname: profile?.user?.firstname || '', // Ensure firstname is included
          lastname: profile?.user?.lastname || '',   // Ensure lastname is included
      },
      userSettings: {
          notificationsEnabled,
          publicProfile,
          twoFactorEnabled,
      }
  };

  try {
      const updatedProfile = await profileApi.updateProfile(updateData);
      setProfile(updatedProfile);
  } catch (err) {
      setError('Failed to update profile settings');
      console.error(err);
  }
};

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get('current-password') as string
    const newPassword = formData.get('new-password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      await profileApi.changePassword({ currentPassword, newPassword }) // Ensure this function is defined in the API
      alert('Password changed successfully')
    } catch (err) {
      setError('Failed to change password')
      console.error(err)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
    }
  }

  if (isLoading) return <div className="min-h-screen bg-[#0D0D0D] text-slate-100 flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen bg-[#0D0D0D] text-slate-100 flex items-center justify-center">Error: {error}</div>

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-red-500">My Account</h1>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-neutral-800 p-1 rounded-xl inline-flex">
            <TabsTrigger value="personal" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all whitespace-nowrap">Personal Information</TabsTrigger>
            <TabsTrigger value="settings" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all whitespace-nowrap">Profile Settings</TabsTrigger>
            <TabsTrigger value="password" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all whitespace-nowrap">Change Password</TabsTrigger>
            <TabsTrigger value="telegram" className="flex-shrink-0 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 transition-all whitespace-nowrap">Telegram Connection</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</Label>
                    <Input 
                      id="name" 
                      name="fullname" 
                      placeholder="John Doe" 
                      className="bg-neutral-700 border-neutral-600 text-slate-100" 
                      defaultValue={profile?.firstname && profile?.lastname ? `${profile.firstname} ${profile.lastname}` : "John Doe"} // Show "John Doe" if not specified
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar" className="text-sm font-medium text-slate-300">Profile Picture</Label>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="h-20 w-20 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
                        {avatarFile ? (
                          <img src={URL.createObjectURL(avatarFile)} alt="Profile" className="h-full w-full object-cover" />
                        ) : profile?.avatar ? (
                          <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-4xl text-slate-400">JD</span>
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-md inline-block">
                          Choose File
                        </label>
                        <input id="avatar-upload" name="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-300">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-neutral-700 border-neutral-600 text-slate-100" 
                      defaultValue={profile?.email} // Set default value
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-slate-300">Bio</Label>
                    <textarea 
                      id="bio" 
                      name="bio" 
                      placeholder="Tell us about yourself" 
                      className="w-full h-32 bg-neutral-700 border-neutral-600 text-slate-100 rounded-md p-2" 
                      defaultValue={profile?.bio} // Set default value
                    />
                  </div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSettingsSubmit} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="text-sm font-medium text-slate-300">Email Notifications</Label>
                    <Switch 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                      className="bg-neutral-600 data-[state=checked]:bg-red-500" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-profile" className="text-sm font-medium text-slate-300">Public Profile</Label>
                    <Switch 
                      checked={publicProfile} 
                      onCheckedChange={setPublicProfile} 
                      className="bg-neutral-600 data-[state=checked]:bg-red-500" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor" className="text-sm font-medium text-slate-300">Two-Factor Authentication</Label>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={setTwoFactorEnabled} 
                      className="bg-neutral-600 data-[state=checked]:bg-red-500" 
                    />
                  </div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-sm font-medium text-slate-300">Current Password</Label>
                    <Input id="current-password" name="current-password" type="password" className="bg-neutral-700 border-neutral-600 text-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-medium text-slate-300">New Password</Label>
                    <Input id="new-password" name="new-password" type="password" className="bg-neutral-700 border-neutral-600 text-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-300">Confirm New Password</Label>
                    <Input id="confirm-password" name="confirm-password" type="password" className="bg-neutral-700 border-neutral-600 text-slate-100" />
                  </div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">Change Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="telegram">
            <Card className="bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-amber-400">Telegram Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-300">Connect your Telegram account to receive notifications and updates.</p>
                  {telegramConnected ? (
                    <div>
                      <p className="text-green-500 mb-2">Your Telegram account is connected.</p>
                      <Button onClick={() => setTelegramConnected(false)} variant="outline" className="bg-neutral-700 text-slate-200 border-neutral-600 hover:bg-white hover:text-red-500 transition-colors">
                        Disconnect Telegram
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setTelegramConnected(true)} className="bg-red-600 hover:bg-red-700">
                      Connect Telegram
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}