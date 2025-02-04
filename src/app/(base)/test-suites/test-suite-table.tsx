import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { testSuiteTableCols } from "./test-suite-table-columns";
import {
  getAllTestSuitesAction,
  deleteTestSuiteAction,
} from "@/actions/test-suite/test-suite-actions";

const TestSuiteTable = async () => {
  const testSuites = await getAllTestSuitesAction();
  return (
    <>
      <DataTable
        columns={testSuiteTableCols}
        data={testSuites}
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
