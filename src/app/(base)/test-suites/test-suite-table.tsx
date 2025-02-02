import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { testSuiteTableCols } from "./test-suite-table-columns";
import prisma from "@/config/db-config";
import { PlusCircle } from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";

const TestSuiteTable = async () => {
  const testSuites = await prisma.testSuite.findMany();
  return (
    <>
      <div className="flex justify-end">
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="icon">
            <Link href="/test-suites/create">
              <PlusCircle className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Link href="/test-suites/modify/1">
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Link href="/test-suites/delete">
              <Trash className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <DataTable
        columns={testSuiteTableCols}
        data={testSuites}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </>
  );
};

export default TestSuiteTable;
