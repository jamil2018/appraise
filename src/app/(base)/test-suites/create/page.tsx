"use client";

import { createTestSuiteAction } from "@/actions/test-suite/test-suite-actions";
import { initialFormState } from "@tanstack/react-form/nextjs";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { formOpts } from "@/constants/form-opts/test-suite-form-opts";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";

const CreateTestSuite = () => {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const res = await createTestSuiteAction(initialFormState, value);
      if (res.status === 200) {
        toast({
          title: "Suite created",
          description: "Test suite created successfully",
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
    <>
      <div className="mb-8">
        <PageHeader>Create Test Suite</PageHeader>
        <HeaderSubtitle>
          Create a new test suite to run your tests against
        </HeaderSubtitle>
      </div>
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
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Create"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
};

export default CreateTestSuite;
