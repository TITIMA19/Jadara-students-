import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Layout from "@/components/Layout";
// import Layout from "@/components/Layout";

export function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
   const [form, setForm] = useState({ username: "", email: "", password: "" });
const [registered, setRegistered] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // ✅ prevent the page from reloading

  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setRegistered(true);
  } else {
    alert("Registration failed");
  }
};

  return registered ? (
    <Layout children={undefined}/> 
  ) : (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email  to create  your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
               <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="m@example.com"
                   onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                   onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input id="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <Button type="submit"  className="w-full">
                Sign up
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
              <a href="/" className="underline underline-offset-4">
               Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
         
  )
}
