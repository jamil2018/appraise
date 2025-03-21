"use server";

import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";

export async function getAllTemplateStepsAction(): Promise<ActionResponse> {
  try {
    const templateSteps = await prisma.templateStep.findMany({
      include: {
        parameters: {
          select: {
            name: true,
          },
        },
      },
    });
    return {
      status: 200,
      data: templateSteps,
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}

export async function deleteTemplateStepAction(
  templateStepIds: string[]
): Promise<ActionResponse> {
  try {
    await prisma.templateStep.deleteMany({
      where: {
        id: { in: templateStepIds },
      },
    });
    return {
      status: 200,
      message: "Template steps deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}
