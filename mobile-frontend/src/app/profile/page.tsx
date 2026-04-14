"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bell,
  ChevronRight,
  Loader2,
  LogOut,
  Pencil,
  Settings as SettingsIcon,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});

export default function ProfilePage() {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  useEffect(() => {
    if (user) form.reset({ name: user.name, email: user.email });
  }, [user, form]);

  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsSubmitting(true);
    try {
      const success = await updateProfile({
        name: values.name,
        email: values.email,
      });
      if (success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (isLoading || !user) {
    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <Card className="rounded-2xl border-border/60">
          <CardContent className="flex items-center justify-center py-16">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#1976d2" }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  const menuItems = [
    {
      icon: <Bell className="h-4.5 w-4.5 text-orange-500" />,
      bg: "bg-orange-50 dark:bg-orange-900/20",
      label: "Notifications",
      sub: "Manage your alerts",
      onClick: () => toast.info("Notifications settings coming soon!"),
    },
    {
      icon: <Shield className="h-4.5 w-4.5 text-[#1976d2]" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      label: "Security",
      sub: "Password & 2FA",
      onClick: () => toast.info("Security settings coming soon!"),
    },
    {
      icon: <SettingsIcon className="h-4.5 w-4.5 text-slate-500" />,
      bg: "bg-slate-100 dark:bg-slate-800/50",
      label: "Preferences",
      sub: "App settings & themes",
      onClick: () => toast.info("Settings page coming soon!"),
    },
    {
      icon: <User className="h-4.5 w-4.5 text-violet-500" />,
      bg: "bg-violet-50 dark:bg-violet-900/20",
      label: "Account Details",
      sub: "Linked accounts & KYC",
      onClick: () => {},
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account
        </p>
      </div>

      {/* Profile Header — web gradient style */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          boxShadow: "0 8px 32px rgba(25,118,210,0.3)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-white/30 shadow-lg flex-shrink-0">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xl font-bold bg-white/20 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">
              {user.name}
            </h2>
            <p className="text-sm text-white/70 truncate">{user.email}</p>
            {user.id && (
              <p className="text-xs text-white/50 mt-1 font-mono">
                ID: {user.id}
              </p>
            )}
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onProfileSubmit)}
                  className="space-y-4 py-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="pt-2">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl border-0"
                      style={{ backgroundColor: "#1976d2", color: "#fff" }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Settings Menu — web-style card */}
      <Card className="rounded-2xl border-border/60 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {menuItems.map((item, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left"
                onClick={item.onClick}
              >
                <div
                  className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              {i < menuItems.length - 1 && <Separator className="mx-5" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                className="rounded-xl"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
