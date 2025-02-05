// action.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/config/db-config";
import { testSuiteSchema } from "@/constants/form-opts/test-suite-form-opts";
import { ActionResponse } from "@/types/form/actionHandler";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

export async function createTestSuiteAction(
  _prev: unknown,
  value: z.infer<typeof testSuiteSchema>
): Promise<ActionResponse> {
  try {
    testSuiteSchema.parse(value);
    const session = await auth();
    await prisma.testSuite.create({
      data: {
        name: value.name,
        description: value.description,
        creator: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    revalidatePath("/test-suites");
    return {
      status: 200,
      message: "Test suite created successfully",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 400,
        error: e.message,
      };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: 500,
        error: e.message,
      };
    }
    return {
      status: 500,
      error: "Server error occurred",
    };
  }
}

export async function getAllTestSuitesAction(): Promise<ActionResponse> {
  try {
    const testSuites = await prisma.testSuite.findMany();
    return {
      status: 200,
      data: testSuites,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteTestSuiteAction(
  id: string[]
): Promise<ActionResponse> {
  try {
    await prisma.testSuite.deleteMany({
      where: { id: { in: id } },
    });
    revalidatePath("/test-suites");
    return {
      status: 200,
      message: "Test suite(s) deleted successfully",
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
