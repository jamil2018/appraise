"use client";

import { createTestSuiteAction } from "@/actions/test-suite/test-suite-actions";
import { initialFormState } from "@tanstack/react-form/nextjs";
import React, { useActionState } from "react";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { formOpts } from "@/constants/form-opts/test-suite-form-opts";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldX } from "lucide-react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";

const CreateTestSuite = () => {
  const [state, action] = useActionState(
    createTestSuiteAction,
    initialFormState
  );
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    onSubmit: () => {
      toast({
        title: "Suite created",
        description: "Test suite created successfully",
      });
    },
  });
  const formErrors = useStore(form.store, (state) => state.errors);
  console.log(formErrors);
  console.log(useStore(form.store, (state) => console.log(state)));

  return (
    <>
      <div className="mb-8">
        <PageHeader>Create Test Suite</PageHeader>
        <HeaderSubtitle>
          Create a new test suite to run your tests against
        </HeaderSubtitle>
      </div>
      <form action={action as never} onSubmit={() => form.handleSubmit()}>
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
      {formErrors.length > 0 && (
        <Card className="mt-4 bg-pink-500 text-white lg:w-1/3 p-0">
          <CardHeader className="p-2">
            <CardTitle>
              <span className="flex items-center">
                <ShieldX className="w-6 h-6 mr-1" /> Error(s)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <ul className="list-disc list-inside">
              {formErrors.map((error) => (
                <li key={error as string} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CreateTestSuite;
