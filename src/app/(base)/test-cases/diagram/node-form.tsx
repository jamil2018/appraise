import React from "react";
import { formOpts, NodeData } from "@/constants/form-opts/diagram/node-form";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateStep } from "@prisma/client";

const NodeForm = ({
  onSubmitAction,
  templateSteps,
  initialValues,
}: {
  onSubmitAction: (values: NodeData) => void;
  initialValues: NodeData;
  templateSteps: TemplateStep[];
}) => {
  const form = useForm({
    defaultValues: initialValues,
    validators: formOpts?.validators,
    onSubmit: async ({ value }) => {
      onSubmitAction(value);
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
      <div className="flex gap-4">
        <div className="w-full">
          <form.Field
            name="label"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "Label must be at least 3 characters" }),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
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
          <form.Field
            name="templateStepId"
            validators={{
              onChange: z.string(),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
                  <Label htmlFor={field.name}>Template Step</Label>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template step" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateSteps.map((step) => (
                        <SelectItem key={step.id} value={step.id}>
                          {step.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          </form.Field>
        </div>
      </div>
    </form>
  );
};

export default NodeForm;
