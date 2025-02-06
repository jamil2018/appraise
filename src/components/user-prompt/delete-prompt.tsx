"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertCircle, Trash, X } from "lucide-react";
import { useState } from "react";

export default function DeletePrompt({
  isDisabled,
  dialogTitle,
  dialogDescription,
  confirmationText,
  deleteHandler,
}: {
  isDisabled: boolean;
  dialogTitle: string;
  dialogDescription: string;
  confirmationText: string;
  deleteHandler: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild disabled={isDisabled}>
        <Button variant="outline" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-end gap-2">
            <AlertCircle className="w-5 h-5" />
            {dialogTitle}
          </DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-md">{confirmationText}</h1>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              deleteHandler();
              setIsOpen(false);
            }}
          >
            <span className="flex items-center gap-2">
              <Trash className="w-4 h-4" />
              Delete
            </span>
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
