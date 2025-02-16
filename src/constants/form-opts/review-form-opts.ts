import { formOptions } from "@tanstack/react-form/nextjs";
import { z } from "zod";

export const reviewSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
});

export type Review = z.infer<typeof reviewSchema>;

export const formOpts = formOptions({
  defaultValues: {
    title: "",
  },
  validators: {
    onChange: reviewSchema,
  },
});
