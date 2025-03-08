"use server";

import { signOut, signIn } from "@/auth";
import prisma from "@/config/db-config";
import { hashPassword } from "@/lib/utils";
import { ActionResponse } from "@/types/form/actionHandler";
import { Role } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signOutAction = async () => {
  await signOut();
};

export const signInAction = async (
  provider: "github" | "google" | "credentials",
  formData?: FormData
): Promise<ActionResponse> => {
  try {
    const result: { email: string } = await signIn(provider, formData);
    console.log("signInAction");
    console.log(result);
    if (result.email) {
      return {
        status: 200,
        message: "User signed in successfully",
      };
    }
    return {
      status: 401,
      message: "Invalid credentials",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      status: 500,
      message: "Failed to sign in",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const registerUserAction = async (
  _previousState: unknown,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const hashedPassword = await hashPassword(
      formData.get("password") as string
    );
    const data = await prisma.user.create({
      data: {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: hashedPassword,
        role: formData.get("reviewer") === "on" ? Role.REVIEWER : Role.TESTER,
      },
    });
    return {
      status: 200,
      data,
      message: "User registered successfully",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: 500,
        error: `Failed to register user. Error: ${error.message}`,
      };
    }
    return {
      status: 500,
      error: "Failed to register user",
    };
  }
};
