import {
  getTestCaseByIdAction,
  updateTestCaseAction,
} from "@/actions/test-case/test-case-actionts";
import { TestCase } from "@prisma/client";
import React from "react";
import TestCaseForm from "../../test-case-form";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import PageHeader from "@/components/typography/page-header";

const ModifyTestCase = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getTestCaseByIdAction(id);

  if (error) {
    return <div>Error: {error}</div>;
  }
  const testCase = data as TestCase;
  return (
    <>
      <div className="mb-8">
        <PageHeader>Modify Test Case</PageHeader>
        <HeaderSubtitle>Modify a test case</HeaderSubtitle>
      </div>
      <TestCaseForm
        successTitle="Test case updated"
        successMessage="Test case updated successfully"
        onSubmitAction={updateTestCaseAction}
        id={id}
        defaultValues={{
          title: testCase.title ?? "",
          description: testCase.description ?? "",
          steps: testCase.steps ?? [],
          expectedOutcome: testCase.expectedOutcome ?? "",
        }}
      />
    </>
  );
};

export default ModifyTestCase;
