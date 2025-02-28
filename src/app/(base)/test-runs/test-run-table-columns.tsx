"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import TableActions from "@/components/table/table-actions";
import {
  deleteTestRunAction,
  TestRunWithRelations,
} from "@/actions/test-run/test-run-actions";

export const testRunTableCols: ColumnDef<TestRunWithRelations>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "testSuite.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test Suite" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
  },
  {
    accessorKey: "executionTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Execution Time" />
    ),
  },
  {
    accessorKey: "executor.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Executed By" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;

      return (
        <TableActions
          modifyLink={`/test-runs/modify/${review.id}`}
          deleteHandler={() => deleteTestRunAction([review.id])}
        />
      );
    },
  },
];
