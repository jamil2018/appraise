// action.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/config/db-config";
import { formOpts } from "@/constants/form-opts/test-suite-form-opts";
import { Prisma } from "@prisma/client";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";
import { revalidatePath } from "next/cache";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.name.length < 5) {
      return "Server validation: Name must be at least 3 characters";
    }
  },
});

export async function createTestSuiteAction(
  _prev: unknown,
  formData: FormData
) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.error("Server error occurred");
      console.log(e.formState);
      return e.formState;
    }
    throw e;
  }
  try {
    const session = await auth();
    await prisma.testSuite.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        creator: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    revalidatePath("/test-suites");
    return formData;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
    }
    throw e;
  }
}

export async function getAllTestSuitesAction() {
  try {
    const testSuites = await prisma.testSuite.findMany();
    return testSuites;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteTestSuiteAction(id: string[]) {
  try {
    await prisma.testSuite.deleteMany({
      where: { id: { in: id } },
    });
    revalidatePath("/test-suites");
    return {
      success: true,
      message: "Test suites deleted successfully",
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
