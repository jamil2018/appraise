import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import { BookOpenCheck } from "lucide-react";
import React from "react";

const TestRuns = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>
          <span className="flex items-center">
            <BookOpenCheck className="w-8 h-8 mr-2" />
            Test Runs
          </span>
        </PageHeader>
        <HeaderSubtitle>
          Test runs are collections of tests that are used to test a specific
          feature or functionality
        </HeaderSubtitle>
      </div>
    </>
  );
};

export default TestRuns;
