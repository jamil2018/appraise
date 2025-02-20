import {
  getTestSuiteByIdAction,
  updateTestSuiteAction,
} from "@/actions/test-suite/test-suite-actions";
import { TestSuiteForm } from "../../test-suite-form";
import React from "react";
import { TestSuite } from "@prisma/client";
import { getAllTestCasesAction } from "@/actions/test-case/test-case-actions";
import { TestCase } from "@prisma/client";

const ModifyTestSuite = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: testSuite, error } = await getTestSuiteByIdAction(id);
  const { data: testCases } = await getAllTestCasesAction();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const testSuiteData = testSuite as TestSuite & { testCases: TestCase[] };

  return (
    <TestSuiteForm
      defaultValues={{
        name: testSuiteData.name ?? "",
        description: testSuiteData.description ?? "",
        testCases: testSuiteData.testCases.map((testCase) => testCase.id),
      }}
      successTitle="Suite updated"
      successMessage="Test suite updated successfully"
      onSubmitAction={updateTestSuiteAction}
      id={id}
      testCases={testCases as TestCase[]}
    />
  );
};

export default ModifyTestSuite;
