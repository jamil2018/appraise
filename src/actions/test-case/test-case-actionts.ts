"use server";

import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";
import { revalidatePath } from "next/cache";

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
