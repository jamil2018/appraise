"use server";

import { signOut, signIn } from "@/auth";
import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";
import { Role } from "@prisma/client";

export const signOutAction = async () => {
  await signOut();
};

export const signInAction = async (
  provider: "github" | "google" | "credentials"
) => {
  await signIn(provider);
};

export const registerUserAction = async (
  _previousState: unknown,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const data = await prisma.user.create({
      data: {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("reviewer") === "on" ? Role.REVIEWER : Role.TESTER,
      },
    });
    return { data, message: "User registered successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: `Failed to register user. Error: ${error.message}` };
    }
    return { error: "Failed to register user" };
  }
};
