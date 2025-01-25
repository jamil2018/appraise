"use client";

import { registerUserAction } from "@/actions/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import Form from "next/form";
import React, { useActionState, useEffect } from "react";

const RegisterForm = () => {
  const { toast } = useToast();

  const [data, action, isPending] = useActionState(
    registerUserAction,
    undefined
  );

  useEffect(() => {
    if (data?.error) {
      toast({ title: data.error, variant: "destructive" });
    }
    if (data?.message) {
      toast({ title: data.message, variant: "default" });
    }
  }, [data, toast]);

  return (
    <Form action={action} className="flex flex-col gap-4 mt-4">
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
      <Label htmlFor="confirmPassword" className="text-sm font-semibold">
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
        disabled={isPending}
      >
        {isPending ? (
          <>
            <LoaderCircle size={16} className="mr-2 animate-spin" />
            Registering...
          </>
        ) : (
          "Register"
        )}
      </Button>
    </Form>
  );
};

export default RegisterForm;
