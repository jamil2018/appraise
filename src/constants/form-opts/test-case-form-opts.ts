import { formOptions } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const testCaseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  steps: z.array(z.string()).min(1, { message: "Steps are required" }),
  expectedOutcome: z.string().min(3, {
    message: "Expected outcome must be at least 3 characters",
  }),
});

export type TestCase = z.infer<typeof testCaseSchema>;

export const formOpts = formOptions({
  defaultValues: {
    title: "",
    description: "",
    steps: [],
    expectedOutcome: "",
  } as TestCase,
  validators: {
    onChange: testCaseSchema,
  },
});
