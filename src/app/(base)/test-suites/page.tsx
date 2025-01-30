import { DataTable } from "@/components/ui/data-table";
import prisma from "@/config/db-config";
import React from "react";
import { testSuiteTableCols } from "./test-suite-table-columns";

const TestSuites = async () => {
  const testSuites = await prisma.testSuite.findMany();
  return (
    <>
      <DataTable
        columns={testSuiteTableCols}
        data={testSuites}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </>
  );
};

export default TestSuites;
