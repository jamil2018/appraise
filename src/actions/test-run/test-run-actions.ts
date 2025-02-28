"use server";

import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";
import { TestRun } from "@prisma/client";

export interface TestRunWithRelations extends TestRun {
  testSuite: {
    name: string;
  };
  executor: {
    username: string;
  };
}

export async function getTestRunsAction(): Promise<ActionResponse> {
  try {
    const testRuns = await prisma.testRun.findMany({
      include: {
        testSuite: {
          select: {
            name: true,
          },
        },
        executor: {
          select: {
            username: true,
          },
        },
      },
    });
    return {
      status: 200,
      data: testRuns as TestRunWithRelations[],
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}

export async function deleteTestRunAction(
  id: string[]
): Promise<ActionResponse> {
  try {
    await prisma.testRun.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    return {
      status: 200,
      message: "Test runs deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}
