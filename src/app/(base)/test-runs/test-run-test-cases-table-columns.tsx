"use client";
("");

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  TestRunTestCases,
  updateTestRunTestCaseAction,
} from "@/actions/test-run/test-run-actions";
import { TestCaseStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const testRunTestCasesTableCols: ColumnDef<TestRunTestCases>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "testCase.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "testCase.expectedOutcome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expected Outcome" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status as TestCaseStatus;
      return (
        <Select
          defaultValue={status}
          onValueChange={(value) => {
            updateTestRunTestCaseAction(
              row.original.testRunId,
              row.original.testCaseId,
              {
                status: value as TestCaseStatus,
              }
            );
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder={status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TestCaseStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={TestCaseStatus.IN_PROGRESS}>
              In Progress
            </SelectItem>
            <SelectItem value={TestCaseStatus.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Result" />
    ),
  },
  {
    accessorKey: "executionTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Execution Time" />
    ),
    cell: ({ row }) => {
      const executionTime = row.original.executionTime;
      return executionTime ? executionTime : "Unexecuted";
    },
  },
];
