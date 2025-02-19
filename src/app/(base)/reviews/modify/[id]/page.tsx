import {
  getReviewByIdAction,
  updateReviewAction,
} from "@/actions/review/review-actions";
import { Review, TestCase, User } from "@prisma/client";
import React from "react";
import ReviewForm from "../../review-form";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import PageHeader from "@/components/typography/page-header";
import { getAllTestCasesAction } from "@/actions/test-case/test-case-actions";
import { getAllUsersAction } from "@/actions/user/user-actions";

const ModifyReview = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getReviewByIdAction(id);
  const { data: users, error: usersError } = await getAllUsersAction();
  const { data: testCases, error: testCasesError } =
    await getAllTestCasesAction();

  if (error || usersError || testCasesError) {
    return <div>Error: {error || usersError || testCasesError}</div>;
  }

  const review = data as Review;
  return (
    <>
      <div className="mb-8">
        <PageHeader>Modify Review</PageHeader>
        <HeaderSubtitle>Modify a review</HeaderSubtitle>
      </div>
      <ReviewForm
        successTitle="Review updated"
        successMessage="Review updated successfully"
        onSubmitAction={updateReviewAction}
        id={id}
        defaultValues={{
          testCaseId: review.testCaseId,
          reviewerId: review.reviewerId,
          status: review.status,
          comments: review.comments ?? "",
        }}
        users={users as User[]}
        testCases={testCases as TestCase[]}
      />
    </>
  );
};

export default ModifyReview;
