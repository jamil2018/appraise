import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";

export async function getAllLocatorsAction(): Promise<ActionResponse> {
  try {
    const locators = await prisma.locator.findMany();
    return {
      status: 200,
      data: locators,
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}
