import { formOptions } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const testSuiteSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
});

export type TestSuite = z.infer<typeof testSuiteSchema>;

export const formOpts = formOptions({
  defaultValues: {
    name: "",
    description: "",
  } as TestSuite,
  validators: {
    onChange: testSuiteSchema,
  },
});
