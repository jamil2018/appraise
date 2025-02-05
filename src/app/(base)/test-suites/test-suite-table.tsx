import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { testSuiteTableCols } from "./test-suite-table-columns";
import {
  getAllTestSuitesAction,
  deleteTestSuiteAction,
} from "@/actions/test-suite/test-suite-actions";
import { TestSuite } from "@prisma/client";

const TestSuiteTable = async () => {
  const { data: testSuites } = await getAllTestSuitesAction();
  return (
    <>
      <DataTable
        columns={testSuiteTableCols}
        data={testSuites as TestSuite[]}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        createLink="/test-suites/create"
        modifyLink="/test-suites/modify"
        deleteAction={deleteTestSuiteAction}
      />
    </>
  );
};

export default TestSuiteTable;
