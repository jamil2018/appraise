"use server";

import prisma from "@/config/db-config";
import { ActionResponse } from "@/types/form/actionHandler";
import { Review } from "@prisma/client";

export interface ReviewWithRelations extends Review {
  testCase: {
    title: string;
  };
  reviewer: {
    username: string;
  };
}

export async function getAllReviewsAction(): Promise<ActionResponse> {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        testCase: {
          select: {
            title: true,
          },
        },
        reviewer: {
          select: {
            username: true,
          },
        },
      },
    });
    return {
      status: 200,
      data: reviews,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

export async function deleteReviewAction(
  id: string[]
): Promise<ActionResponse> {
  try {
    await prisma.review.deleteMany({
      where: { id: { in: id } },
    });
    return {
      status: 200,
      data: "Review deleted successfully",
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

export async function getReviewByIdAction(id: string): Promise<ActionResponse> {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return {
      status: 200,
      data: review,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}

export async function updateReviewAction(
  id: string,
  review: Review
): Promise<ActionResponse> {
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: review,
    });
    return {
      status: 200,
      data: updatedReview,
    };
  } catch (e) {
    return {
      status: 500,
      error: `Server error occurred: ${e}`,
    };
  }
}
