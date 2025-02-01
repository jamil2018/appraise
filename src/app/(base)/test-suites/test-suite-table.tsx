import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { testSuiteTableCols } from "./test-suite-table-columns";
import prisma from "@/config/db-config";

const TestSuiteTable = async () => {
  // Add artificial delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const testSuites = await prisma.testSuite.findMany();
  return (
    <DataTable
      columns={testSuiteTableCols}
      data={testSuites}
      filterColumn="name"
      filterPlaceholder="Filter by name..."
    />
  );
};

export default TestSuiteTable;
