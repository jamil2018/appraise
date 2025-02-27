"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteReviewAction } from "@/actions/review/review-actions";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ReviewWithRelations } from "@/actions/review/review-actions";
import TableActions from "@/components/table/table-actions";

export const reviewTableByCreatorCols: ColumnDef<ReviewWithRelations>[] = [
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
    accessorKey: "testCase.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test Case" />
    ),
  },
  {
    accessorKey: "reviewer.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewer" />
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
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;

      return (
        <TableActions
          modifyLink={`/reviews/modify/${review.id}`}
          deleteHandler={() => deleteReviewAction([review.id])}
        />
      );
    },
  },
];
