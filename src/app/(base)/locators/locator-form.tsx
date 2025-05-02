"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formOpts, Locator } from "@/constants/form-opts/locator-form-opts";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/form/actionHandler";
import { useForm } from "@tanstack/react-form";
import { initialFormState, ServerFormState } from "@tanstack/react-form/nextjs";
import React from "react";
import { z } from "zod";

const LocatorForm = ({
  defaultValues,
  successTitle,
  successMessage,
  id,
  onSubmitAction,
}: {
  defaultValues?: Locator;
  successTitle: string;
  successMessage: string;
  id?: string;
  onSubmitAction: (
    initialFormState: ServerFormState<Locator>,
    value: Locator,
    id?: string
  ) => Promise<ActionResponse>;
}) => {
  const form = useForm({
    defaultValues: defaultValues ?? formOpts?.defaultValues,
    validators: formOpts?.validators,
    onSubmit: async ({ value }) => {
      const res = await onSubmitAction(initialFormState, value, id);
      if (res.status === 200) {
        toast({
          title: successTitle,
          description: successMessage,
        });
      }
      if (res.status === 400) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res.status === 500) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        validators={{
          onChange: z.string().min(1, { message: "Name is required" }),
        }}
      >
        {(field) => {
          return (
            <div className="flex flex-col gap-2 mb-4 lg:w-1/3">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string} className="text-pink-500 text-xs">
                  {error}
                </p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="value"
        validators={{
          onChange: z.string().min(1, { message: "Value is required" }),
        }}
      >
        {(field) => {
          return (
            <div className="flex flex-col gap-2 mb-4 lg:w-1/3">
              <Label htmlFor={field.name}>Value</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string} className="text-pink-500 text-xs">
                  {error}
                </p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Save"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default LocatorForm;
