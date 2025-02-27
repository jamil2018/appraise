"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { ActionResponse } from "@/types/form/actionHandler";
import { toast } from "@/hooks/use-toast";

const TableActions = ({
  modifyLink,
  deleteHandler,
  editActionText = "Edit",
  deleteActionText = "Delete",
  editActionIcon = <Pencil className="h-4 w-4" />,
  deleteActionIcon = <Trash className="h-4 w-4" />,
}: {
  modifyLink: string;
  deleteHandler: () => Promise<ActionResponse>;
  editActionText?: string;
  deleteActionText?: string;
  editActionIcon?: React.ReactNode;
  deleteActionIcon?: React.ReactNode;
}) => {
  return (
    <>
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
            <Link href={modifyLink}>
              <span className="flex items-center gap-2">
                {editActionIcon} {editActionText}
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const res = await deleteHandler();
              if (res.status === 200) {
                toast({
                  title: "Item deleted successfully",
                });
              } else {
                toast({
                  title: "Error deleting item",
                  description: res.error,
                });
              }
            }}
          >
            <span className="flex items-center gap-2">
              {deleteActionIcon} {deleteActionText}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableActions;
