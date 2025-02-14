import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import React from "react";
import TestCaseForm from "../test-case-form";
import { createTestCaseAction } from "@/actions/test-case/test-case-actionts";

const CreateTestCase = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>Create Test Case</PageHeader>
        <HeaderSubtitle>
          Create a new test case to run your tests against
        </HeaderSubtitle>
      </div>
      <TestCaseForm
        successTitle="Test case created"
        successMessage="Test case created successfully"
        onSubmitAction={createTestCaseAction}
      />
    </>
  );
};

export default CreateTestCase;
