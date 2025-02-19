import { createTestSuiteAction } from "@/actions/test-suite/test-suite-actions";
import { TestSuiteForm } from "../test-suite-form";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";

const CreateTestSuite = async () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>Create Test Suite</PageHeader>
        <HeaderSubtitle>
          Create a new test suite to run your tests against
        </HeaderSubtitle>
      </div>
      <TestSuiteForm
        successTitle="Suite created"
        successMessage="Test suite created successfully"
        onSubmitAction={createTestSuiteAction}
      />
    </>
  );
};

export default CreateTestSuite;
