import { TestCaseStepParameterType } from "@prisma/client";
import { formOptions } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const testCaseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        templateStepId: z.string(),
        parameters: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
            type: z.nativeEnum(TestCaseStepParameterType),
            order: z.number(),
          })
        ),
        order: z.number(),
      })
    )
    .min(1, { message: "Steps are required" }),
});

export type TestCase = z.infer<typeof testCaseSchema>;

export const formOpts = formOptions({
  defaultValues: {
    title: "",
    description: "",
    steps: [],
  } as TestCase,
  validators: {
    onChange: testCaseSchema,
  },
});
