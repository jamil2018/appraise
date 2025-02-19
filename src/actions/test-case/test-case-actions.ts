"use server";

import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";
import { revalidatePath } from "next/cache";
import { testCaseSchema } from "@/constants/form-opts/test-case-form-opts";
import { z } from "zod";
import { auth } from "@/auth";
/**
 * Get all test cases
 * @returns ActionResponse
 */
export async function getAllTestCasesAction(): Promise<ActionResponse> {
  try {
    const testCases = await prisma.testCase.findMany();
    return {
      status: 200,
      data: testCases,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

/**
 * Delete a test case
 * @param id - Test case id
 * @returns ActionResponse
 */
export async function deleteTestCaseAction(
  id: string[]
): Promise<ActionResponse> {
  try {
    await prisma.testCase.deleteMany({
      where: { id: { in: id } },
    });
    revalidatePath("/test-cases");
    return {
      status: 200,
      message: "Test case(s) deleted successfully",
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

/**
 * Create a test case
 * @param testCase - Test case
 * @returns ActionResponse
 */
export async function createTestCaseAction(
  _prev: unknown,
  value: z.infer<typeof testCaseSchema>
): Promise<ActionResponse> {
  try {
    testCaseSchema.parse(value);
    const session = await auth();
    const newTestCase = await prisma.testCase.create({
      data: {
        title: value.title,
        description: value.description ?? "",
        steps: value.steps,
        expectedOutcome: value.expectedOutcome,
        creator: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });

    return {
      status: 200,
      message: "Test case created successfully",
      data: newTestCase,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

/**
 * Get a test case by id
 * @param id - Test case id
 * @returns ActionResponse
 */
export async function getTestCaseByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const testCase = await prisma.testCase.findUnique({
      where: { id },
    });
    return {
      status: 200,
      data: testCase,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

/**
 * Update a test case
 * @param id - Test case id
 * @param testCase - Test case
 * @returns ActionResponse
 */
export async function updateTestCaseAction(
  _prev: unknown,
  value: z.infer<typeof testCaseSchema>,
  id?: string
): Promise<ActionResponse> {
  try {
    testCaseSchema.parse(value);
    const updatedTestCase = await prisma.testCase.update({
      where: { id },
      data: value,
    });
    return {
      status: 200,
      message: "Test case updated successfully",
      data: updatedTestCase,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}
