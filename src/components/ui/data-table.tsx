"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { Pencil, PlusCircle, Search, Trash } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn: string;
  filterPlaceholder: string;
  createLink: string;
  modifyLink: string;
  deleteAction: (id: string[]) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
  createLink,
  modifyLink,
  deleteAction,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  console.log(table.getSelectedRowModel().rows.map((row) => row.original));

  return (
    <div className="mb-10">
      <div className="flex justify-end">
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="icon">
            <Link href={createLink}>
              <PlusCircle className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={
              table.getSelectedRowModel().rows.length === 0 ||
              table.getSelectedRowModel().rows.length > 1
            }
          >
            <Link
              href={`${modifyLink}/${
                table.getSelectedRowModel().rows.length > 0
                  ? (
                      table.getSelectedRowModel().rows[0].original as {
                        id: string;
                      }
                    ).id
                  : ""
              }`}
            >
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={table.getSelectedRowModel().rows.length === 0}
            onClick={async () => {
              const res = await deleteAction(
                table
                  .getSelectedRowModel()
                  .rows.map((row) => (row.original as { id: string }).id)
              );
              if (res.success) {
                toast({
                  title: "Test suite(s) deleted successfully",
                });
              } else {
                toast({
                  title: "Error deleting test suite(s)",
                  description: res.message,
                });
              }
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center">
          <Search className="w-6 h-6 mr-2" />
          <Input
            placeholder={filterPlaceholder}
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
