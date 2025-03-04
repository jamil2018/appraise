import PageHeader from "@/components/typography/page-header";
import React from "react";
import {
  getTestRunAction,
  TestRunWithRelations,
} from "@/actions/test-run/test-run-actions";
import { BarChart, BookOpenCheck, CheckCircle, User } from "lucide-react";
import { calculateCompletionPercentage } from "@/lib/utils";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import InfoCard from "@/components/data-visualization/info-card";
import { TestCaseResult, TestCaseStatus } from "@prisma/client";
import PieChartGraph from "@/components/chart/pie-chart";

const ViewTestRun = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data, error } = await getTestRunAction(id);
  if (error) {
    return <div>{error}</div>;
  }
  const { testRun, testRunTestCases } = data as TestRunWithRelations;

  const completionPercentage = calculateCompletionPercentage(
    testRunTestCases.length,
    testRunTestCases.filter(
      (testCase) => testCase.status === TestCaseStatus.COMPLETED.toString()
    ).length
  );

  const chartConfig = Object.values(TestCaseResult).reduce(
    (acc, result, index) => {
      acc[result] = {
        label: result,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>
  );

  const chartData = Object.entries(
    testRunTestCases.reduce((acc: Record<string, number>, testCase) => {
      const count = (acc[testCase.result] || 0) + 1;
      acc[testCase.result] = count;
      return acc;
    }, {})
  ).map(([result, count]) => ({
    result: result,
    count: count,
    fill: chartConfig[result].color,
  }));

  return (
    <>
      <div className="mb-8 flex gap-4">
        <div className="flex-1">
          <PageHeader>
            <span className="flex items-center">
              <BookOpenCheck className="w-8 h-8 mr-2" />
              {testRun.name}
            </span>
          </PageHeader>
          <HeaderSubtitle>
            Details about the test run and the test cases that were executed
          </HeaderSubtitle>
        </div>
        <PieChartGraph
          chartConfig={chartConfig}
          chartData={chartData}
          chartLabelValue={testRunTestCases
            .filter(
              (testCase) => testCase.result === TestCaseResult.PASSED.toString()
            )
            .length.toString()}
          chartLabelText="Passed"
          chartTitle="Test Case Results"
          className="flex-1"
          chartDescription="The results of the test cases that were executed"
          chartValueKey="count"
          chartNameKey="result"
        />
        <InfoCard
          title="Total Passed %"
          description="The total number of test cases that passed"
          value={`${(
            (testRunTestCases.filter(
              (testCase) => testCase.result === TestCaseResult.PASSED.toString()
            ).length /
              testRunTestCases.length) *
            100
          ).toFixed(1)}%`}
          icon={<CheckCircle className="w-4 h-4" />}
          textAlign="center"
          className="flex-1"
        />
      </div>

      {/* Info cards */}
      <div className="flex gap-4">
        <div className="flex-1">
          <InfoCard
            title="Completion Percentage"
            description="The percentage of test cases that were completed"
            value={`${completionPercentage}%`}
            icon={<BarChart className="w-4 h-4" />}
          />
        </div>
        <div className="flex-1">
          <InfoCard
            title="Test Cases"
            description="Total number of test cases in this test run"
            value={`${testRunTestCases.length}`}
            icon={<BookOpenCheck className="w-4 h-4" />}
          />
        </div>
        <div className="flex-1">
          <InfoCard
            title="Assigned To"
            description="The user that was assigned to run this test run"
            value={`${testRun.executor.username}`}
            icon={<User className="w-4 h-4" />}
          />
        </div>
        <div className="flex-1">
          <InfoCard
            title="Test Suite"
            description="The test suite that this test run belongs to"
            value={`${testRun.testSuite.name}`}
            icon={<BookOpenCheck className="w-4 h-4" />}
          />
        </div>
      </div>
    </>
  );
};

export default ViewTestRun;
