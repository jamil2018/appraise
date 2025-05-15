import { TestCaseStepParameterType } from "@prisma/client";
import { formOptions } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const nodeDataSchema = z.object({
  label: z.string().min(3, { message: "Label must be at least 3 characters" }),
  gherkinStep: z
    .string()
    .min(3, { message: "Gherkin step must be at least 3 characters" }),
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
});

export type NodeData = z.infer<typeof nodeDataSchema>;

export const formOpts = formOptions({
  defaultValues: {
    label: "",
    gherkinStep: "",
    templateStepId: "",
    parameters: [],
    order: 0,
  } as NodeData,
  validators: {
    onChange: nodeDataSchema,
  },
});
