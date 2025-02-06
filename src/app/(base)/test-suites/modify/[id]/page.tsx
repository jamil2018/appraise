import {
  getTestSuiteByIdAction,
  updateTestSuiteAction,
} from "@/actions/test-suite/test-suite-actions";
import { TestSuiteForm } from "../../test-suite-form";
import React from "react";
import { TestSuite } from "@prisma/client";
const ModifyTestSuite = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getTestSuiteByIdAction(id);

  if (error) {
    return <div>Error: {error}</div>;
  }
  const testSuite = data as TestSuite;
  return (
    <TestSuiteForm
      defaultValues={{
        name: testSuite.name ?? "",
        description: testSuite.description ?? "",
      }}
      successTitle="Suite updated"
      successMessage="Test suite updated successfully"
      onSubmitAction={updateTestSuiteAction}
      id={id}
    />
  );
};

export default ModifyTestSuite;
