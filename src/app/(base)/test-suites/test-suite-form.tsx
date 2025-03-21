"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelectWithPreview from "@/components/ui/multi-select-with-preview";
import {
  formOpts,
  TestSuite,
} from "@/constants/form-opts/test-suite-form-opts";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/form/actionHandler";
import { TestCase } from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import { ServerFormState, initialFormState } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const TestSuiteForm = ({
  defaultValues,
  successTitle,
  successMessage,
  id,
  onSubmitAction,
  testCases,
}: {
  defaultValues?: TestSuite;
  successTitle: string;
  successMessage: string;
  id?: string;
  onSubmitAction: (
    initialFormState: ServerFormState<TestSuite>,
    value: TestSuite,
    id?: string
  ) => Promise<ActionResponse>;
  testCases: TestCase[];
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
          onChange: z
            .string()
            .min(3, { message: "Name must be at least 3 characters" }),
        }}
      >
        {(field) => {
          return (
            <div className="flex flex-col gap-2 mb-4 lg:w-1/3">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
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
      <form.Field name="description">
        {(field) => {
          return (
            <div className="flex flex-col gap-2 mb-4 lg:w-1/3">
              <Label htmlFor={field.name}>Description</Label>
              <Input
                id={field.name}
                name={field.name}
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
      <form.Field name="testCases">
        {(field) => {
          const testCasesOptions = testCases.map((testCase) => ({
            value: testCase.id,
            label: testCase.title,
          }));
          return (
            <div className="flex flex-col gap-2 mb-4 lg:w-1/3">
              <Label htmlFor={field.name}>Test Cases</Label>
              <MultiSelectWithPreview
                id={field.name}
                options={testCasesOptions}
                onSelectChange={(value) => {
                  field.handleChange(value);
                }}
                defaultSelectedValues={field.state.value}
                placeholder="Select test case(s)"
                emptyMessage="No test case(s) found"
                selectedLabel="Selected test case(s)"
                searchPlaceholder="Search test cases..."
              />
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
