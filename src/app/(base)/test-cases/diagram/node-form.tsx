"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { generateGherkinStep } from "@/lib/transformers/gherkin-converter";

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
  const [parameters, setParameters] = useState<
    {
      name: string;
      value: string;
      type: StepParameterType;
      order: number;
    }[]
  >([]);
  const [parameterErrors, setParameterErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateParameters = (
    values: {
      name: string;
      value: string;
      type: StepParameterType;
      order: number;
    }[]
  ) => {
    const errors: { [key: string]: string } = {};

    values.forEach((param) => {
      if (!param.value || param.value.trim() === "") {
        errors[param.name] = `${param.name} is required`;
      }

      if (param.type === "NUMBER" && isNaN(Number(param.value))) {
        errors[param.name] = `${param.name} must be a number`;
      }

      if (param.type === "DATE" && !isValidDate(param.value)) {
        errors[param.name] = `${param.name} must be a valid date`;
      }
    });

    setParameterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  const handleParametersChange = (
    values: {
      name: string;
      value: string;
      type: StepParameterType;
      order: number;
    }[]
  ) => {
    const isValid = validateParameters(values);
    if (isValid) {
      setParameters(values);
    }
  };

  const form = useForm({
    defaultValues: initialValues,
    validators: formOpts?.validators,
    onSubmit: async ({ value }) => {
      if (!validateParameters(parameters)) {
        return;
      }
      console.log(value);
      console.log("parameters", parameters);
      resetForm();
    },
  });

  const resetForm = useCallback(() => {
    setShowAddNodeDialog(false);
    setSelectedTemplateStepParams([]);
    setSelectedTemplateStep(null);
    setParameters([]);
    setParameterErrors({});
    setGherkinStep("");
    form.reset();
  }, [form, setShowAddNodeDialog]);

  useEffect(() => {
    if (selectedTemplateStep) {
      // console.log(selectedTemplateStep.signature, parameters);
      setGherkinStep(
        generateGherkinStep(selectedTemplateStep.signature, parameters)
      );
    }
  }, [selectedTemplateStep, parameters]);

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
                          setSelectedTemplateStep(
                            templateSteps.find((step) => step.id === value) ||
                              null
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

              <div className="flex flex-col gap-2 mb-4 w-full">
                <DynamicFormFields
                  templateStepParams={selectedTemplateStepParams}
                  locators={locators.map((locator) => locator.name)}
                  onChange={handleParametersChange}
                />
                {Object.entries(parameterErrors).map(([name, error]) => (
                  <p key={name} className="text-pink-500 text-xs">
                    {error}
                  </p>
                ))}
              </div>
              <form.Field
                name="gherkinStep"
                validators={{
                  onChange: z.string(),
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
                        value={gherkinStep}
                        onChange={(e) => {
                          setGherkinStep(e.target.value);
                          field.handleChange(e.target.value);
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
