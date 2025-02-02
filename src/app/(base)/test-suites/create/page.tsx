"use client";

import createTestSuiteAction from "@/actions/test-suite/test-suite-actions";
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

const CreateTestSuite = () => {
  const [state, action] = useActionState(
    createTestSuiteAction,
    initialFormState
  );
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });
  const formErrors = useStore(form.store, (state) => state.errors);

  return (
    <>
      <form action={action as never} onSubmit={() => form.handleSubmit()}>
        {formErrors.map((error) => (
          <p key={error as string}>{error}</p>
        ))}
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
              <div>
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error as string}>{error}</p>
                ))}
              </div>
            );
          }}
        </form.Field>
        <form.Field name="description">
          {(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Description</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error as string}>{error}</p>
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
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
};

export default CreateTestSuite;
