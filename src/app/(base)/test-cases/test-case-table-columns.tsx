"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { TestCase } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { deleteTestCaseAction } from "@/actions/test-case/test-case-actionts";
import { toast } from "@/hooks/use-toast";

export const testCaseTableCols: ColumnDef<TestCase>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "steps",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Steps" />
    ),
  },
  {
    accessorKey: "expectedOutcome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expected Outcome" />
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
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const testCase = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/test-cases/modify/${testCase.id}`}>
                <span className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" /> Edit
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const res = await deleteTestCaseAction([testCase.id]);
                if (res.status === 200) {
                  toast({
                    title: "Test case deleted successfully",
                  });
                } else {
                  toast({
                    title: "Error deleting test case",
                    description: res.error,
                  });
                }
              }}
            >
              <span className="flex items-center gap-2">
                <Trash className="h-4 w-4" /> Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
