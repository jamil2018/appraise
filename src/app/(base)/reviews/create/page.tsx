import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import React from "react";
import ReviewForm from "../review-form";
import { createReviewAction } from "@/actions/review/review-actions";
import { getAllUsersAction } from "@/actions/user/user-actions";
import { TestCase, User } from "@prisma/client";
import { getAllTestCasesAction } from "@/actions/test-case/test-case-actions";
import { auth } from "@/auth";

const CreateReview = async () => {
  const session = await auth();

  const { data: usersData, error: usersError } = await getAllUsersAction();
  const { data: testCasesData, error: testCasesError } =
    await getAllTestCasesAction();
  const users = (usersData as User[]).filter(
    (user) => user.id !== session?.user?.id
  );

  if (usersError || testCasesError) {
    return <div>Error: {usersError || testCasesError}</div>;
  }

  const testCases = testCasesData as TestCase[];
  return (
    <>
      <div className="mb-8">
        <PageHeader>Create Review</PageHeader>
        <HeaderSubtitle>
          Create a new review to test your test cases
        </HeaderSubtitle>
      </div>
      <ReviewForm
        successTitle="Review created"
        successMessage="Review created successfully"
        onSubmitAction={createReviewAction}
        users={users}
        testCases={testCases}
        hideComments={true}
      />
    </>
  );
};

export default CreateReview;
