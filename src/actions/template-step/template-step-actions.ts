"use server";

import prisma from "@/config/db-config";
import { templateStepSchema } from "@/constants/form-opts/template-test-step-form-opts";
import { ActionResponse } from "@/types/form/actionHandler";
import { ParamType, TestCaseTemplateStepType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
    await prisma.templateStepParameter.deleteMany({
      where: {
        templateStepId: { in: templateStepIds },
      },
    });

    await prisma.templateStep.deleteMany({
      where: {
        id: { in: templateStepIds },
      },
    });
    revalidatePath("/template-steps");
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

export async function createTemplateStepAction(
  _prev: unknown,
  value: z.infer<typeof templateStepSchema>
): Promise<ActionResponse> {
  try {
    const newTemplateStep = await prisma.templateStep.create({
      data: {
        name: value.name,
        type: value.type as TestCaseTemplateStepType,
        signature: value.signature,
        description: value.description || "",
        functionDefinition: value.functionDefinition || "",
        parameters: {
          create: value.params.map((param) => ({
            name: param.name,
            type: param.type as ParamType,
            order: param.order,
          })),
        },
      },
    });

    revalidatePath("/template-steps");

    return {
      status: 200,
      message: "Template step created successfully",
      data: newTemplateStep,
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}
