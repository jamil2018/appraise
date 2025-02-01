import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import { TestTubes } from "lucide-react";
import { auth } from "@/auth";
import TestSuiteTable from "./test-suite-table";
import { Suspense } from "react";
import Loading from "../../../components/ui/loading";

const TestSuites = async () => {
  const session = await auth();
  console.log(session?.user);
  return (
    <>
      <div className="mb-8">
        <PageHeader>
          <span className="flex items-center">
            <TestTubes className="w-8 h-8 mr-2" />
            Test Suites
          </span>
        </PageHeader>
        <HeaderSubtitle>
          Test suites are collections of tests that are used to test a specific
          feature or functionality
        </HeaderSubtitle>
      </div>
      <Suspense fallback={<Loading />}>
        <TestSuiteTable />
      </Suspense>
    </>
  );
};

export default TestSuites;
