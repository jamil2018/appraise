import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";

export async function getAllUsersAction(): Promise<ActionResponse> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return {
      status: 200,
      data: users,
    };
  } catch (error) {
    return {
      status: 500,
      error: `Server error occurred: ${error}`,
    };
  }
}
