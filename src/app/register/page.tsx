"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const [showServerError, setShowServerError] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <div className="grid place-items-center h-screen -mt-16">
      <div className="w-3/4 mx-auto mt-8 bg-gradient-to-r dark:from-white/5 dark:via-white/10 dark:to-white/5 backdrop-blur-lg rounded-lg p-4 border dark:border-white/10 border-slate-700/10 flex gap-4 justify-between items-center from-slate-500/5 via-slate-500/10 to-slate-500/5">
        <div className="flex-1 flex items-center justify-center">
          <FlaskConical size={50} className="mr-2 text-primary" />
          <span className="tracking-widest text-6xl underline dark:bg-primary dark:text-gray-700 rounded-l-lg pl-2 pb-4 bg-gray-800 text-white">
            app
          </span>
          <span className="tracking-widest text-6xl text-primary">raise</span>
        </div>
        <Card className="bg-transparent border-none shadow-none flex-1">
          <div className="w-fit">
            <CardHeader>
              <CardTitle className="text-4xl">Welcome to Appraise</CardTitle>
              <CardDescription className="text-md">
                Sign up to start managing your test cases
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <Form
                action="/api/auth/signup"
                className="flex flex-col gap-4 mt-4"
              >
                <Label htmlFor="username" className="text-sm font-semibold">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  name="username"
                  className="dark:border-gray-600/50"
                  required
                />
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  name="email"
                  className="dark:border-gray-600/50"
                  required
                />
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  className="dark:border-gray-600/50"
                  required
                />
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold"
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter your password"
                  name="confirmPassword"
                  className="dark:border-gray-600/50"
                  required
                />
                <div className="flex items-center gap-2 my-2">
                  <Checkbox id="reviewer" name="reviewer" />
                  <Label htmlFor="reviewer" className="text-sm font-semibold">
                    I will be reviewing test cases
                  </Label>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="font-semibold max-w-full"
                >
                  Register
                </Button>
              </Form>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground my-4 inline-block">
                  Already have an account?{" "}
                </span>
                <Button variant="link" className="font-semibold text-sm px-1">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
