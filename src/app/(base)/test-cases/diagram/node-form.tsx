"use client";
import React, { useCallback, useState } from "react";
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
import {
  Locator,
  StepParameterType,
  TemplateStep,
  TemplateStepParameter,
} from "@prisma/client";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicFormFields from "./dynamic-parameters";

const NodeForm = ({
  templateSteps,
  templateStepParams,
  initialValues,
  showAddNodeDialog,
  locators,
  setShowAddNodeDialog,
}: {
  templateSteps: TemplateStep[];
  templateStepParams: TemplateStepParameter[];
  initialValues: NodeData;
  showAddNodeDialog: boolean;
  locators: Locator[];
  setShowAddNodeDialog: (show: boolean) => void;
}) => {
  const [selectedTemplateStepParams, setSelectedTemplateStepParams] = useState<
    TemplateStepParameter[]
  >([]);
  const [selectedTemplateStep, setSelectedTemplateStep] =
    useState<TemplateStep | null>(null);

  const [gherkinStep, setGherkinStep] = useState<string>("");

  const form = useForm({
    defaultValues: initialValues,
    validators: formOpts?.validators,
    onSubmit: async ({ value }) => {
      console.log(value);
      resetForm();
    },
  });

  const resetForm = useCallback(() => {
    setShowAddNodeDialog(false);
    setSelectedTemplateStepParams([]);
    setSelectedTemplateStep(null);
    form.reset();
  }, [form, setShowAddNodeDialog]);

  return (
    <Dialog open={showAddNodeDialog} onOpenChange={setShowAddNodeDialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Node</DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 w-full">
            <div className="w-full">
              <form.Field
                name="label"
                validators={{
                  onChange: z.string().min(1, { message: "Label is required" }),
                }}
              >
                {(field) => {
                  return (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <Label htmlFor={field.name}>Label</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="text-pink-500 text-xs"
                        >
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
                  onChange: z
                    .string()
                    .min(1, { message: "Template step is required" }),
                }}
              >
                {(field) => {
                  return (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <Label htmlFor={field.name}>Template Step</Label>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value);
                          setSelectedTemplateStepParams(
                            templateStepParams.filter(
                              (param) => param.templateStepId === value
                            )
                          );
                        }}
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
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="text-pink-500 text-xs"
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
              {selectedTemplateStepParams.length > 0 && (
                <form.Field
                  name="parameters"
                  validators={{
                    onChange: z
                      .array(
                        z.object({
                          name: z.string(),
                          value: z.string(),
                          type: z.nativeEnum(StepParameterType),
                          order: z.number(),
                        })
                      )
                      .min(selectedTemplateStepParams.length, {
                        message: "All parameters are required",
                      }),
                  }}
                >
                  {(field) => {
                    return (
                      <div className="flex flex-col gap-2 mb-4 w-full">
                        <DynamicFormFields
                          templateStepParams={selectedTemplateStepParams}
                          locators={locators.map((locator) => locator.name)}
                          onChange={(values, isValid) => {
                            if (!isValid) {
                              field.setMeta((prev) => ({
                                ...prev,
                                errors: [
                                  "Please fill all required parameter fields.",
                                ],
                              }));
                            } else {
                              field.setMeta((prev) => ({
                                ...prev,
                                errors: [],
                              }));
                            }
                            field.handleChange(values);
                          }}
                        />
                        {field.state.meta.errors.map((error) => (
                          <p
                            key={error as string}
                            className="text-pink-500 text-xs"
                          >
                            {error}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                </form.Field>
              )}
              <form.Field
                name="gherkinStep"
                validators={{
                  onChange: z
                    .string()
                    .min(1, { message: "Gherkin step is required" }),
                }}
              >
                {(field) => {
                  return (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <Label htmlFor={field.name}>Gherkin Step</Label>
                      <Input
                        id={field.name}
                        disabled
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="text-pink-500 text-xs"
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
              <form.Field
                name="order"
                validators={{
                  onChange: z.number().min(0, { message: "Order is required" }),
                }}
              >
                {(field) => {
                  return (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <Label htmlFor={field.name}>Order</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="text-pink-500 text-xs"
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  onClick={() => form.handleSubmit()}
                >
                  {isSubmitting ? "..." : "Save"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NodeForm;
