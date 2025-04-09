"use client";

import { Button } from "@/components/ui/button";
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
  formOpts,
  TemplateStep,
} from "@/constants/form-opts/template-test-step-form-opts";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/form/actionHandler";
import {
  ParamType,
  TestCaseTemplateStepType,
  TemplateStepParameter,
} from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import { ServerFormState, initialFormState } from "@tanstack/react-form/nextjs";
import { z } from "zod";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";
import estreePlugin from "prettier/plugins/estree";
import ParamChip from "./paramChip";

let defaultFunctionDefinition = `When('', async function(this:World){});`;

export const TemplateStepForm = ({
  defaultValues,
  successTitle,
  successMessage,
  id,
  onSubmitAction,
}: {
  defaultValues?: TemplateStep;
  successTitle: string;
  successMessage: string;
  id?: string;
  onSubmitAction: (
    initialFormState: ServerFormState<TemplateStep>,
    value: TemplateStep,
    id?: string
  ) => Promise<ActionResponse>;
}) => {
  useEffect(() => {
    const formatFunctionDefinition = async () => {
      defaultFunctionDefinition = await prettier.format(
        defaultFunctionDefinition,
        {
          parser: "typescript",
          plugins: [parserTypescript, estreePlugin],
        }
      );
    };
    formatFunctionDefinition();
  }, []);

  const [signature, setSignature] = useState(defaultValues?.signature ?? "");
  const [functionDefinition, setFunctionDefinition] = useState(
    defaultValues?.functionDefinition ?? defaultFunctionDefinition
  );
  const [type, setType] = useState<TestCaseTemplateStepType>(
    (defaultValues?.type as TestCaseTemplateStepType) ??
      TestCaseTemplateStepType.ACTION
  );
  const [params, setParams] = useState<TemplateStepParameter[]>(
    (defaultValues?.params as TemplateStepParameter[]) ?? []
  );

  const form = useForm({
    defaultValues: defaultValues ?? formOpts?.defaultValues,
    validators: formOpts?.validators,
    onSubmit: async ({ value }) => {
      value.functionDefinition = functionDefinition;
      const res = await onSubmitAction(initialFormState, value, id);
      if (res.status === 200) {
        toast({
          title: successTitle,
          description: successMessage,
        });
      }
      if (res.status === 400) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res.status === 500) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
    },
  });

  useEffect(() => {
    function updateStepSignature(
      code: string,
      newSignature: string,
      type: TestCaseTemplateStepType,
      quoteType: `'` | `"` | "`" = `'`
    ): string {
      if (type === TestCaseTemplateStepType.ASSERTION) {
        return code.replace(
          /(When|Then)\((['"`])(.*?)\2/,
          () => `Then(${quoteType}${newSignature}${quoteType}`
        );
      }
      return code.replace(
        /(When|Then)\((['"`])(.*?)\2/,
        () => `When(${quoteType}${newSignature}${quoteType}`
      );
    }
    setFunctionDefinition(
      updateStepSignature(functionDefinition, signature, type)
    );
  }, [functionDefinition, signature, type]);

  useEffect(() => {
    const paramsString = params
      .map((param) => `${param.name}: ${param.type.toLowerCase()}`)
      .join(", ");
    const updatedFunctionDefinition = functionDefinition.replace(
      /async function\s*\(\s*this:World(?:,\s*.*?)?\s*\)/,
      `async function(this:World${params.length > 0 ? ", " : ""}${paramsString})`
    );
    setFunctionDefinition(updatedFunctionDefinition);
  }, [params, functionDefinition]);

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
            name="name"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "Name must be at least 3 characters" }),
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
          <form.Field name="description">
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
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
          <form.Field
            name="type"
            validators={{
              onChange: z.string().min(1, { message: "Type is required" }),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
                  <Label htmlFor={field.name}>Type</Label>
                  <Select
                    onValueChange={(value) => {
                      field.handleChange(value);
                      setType(value as TestCaseTemplateStepType);
                    }}
                    value={field.state.value}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TestCaseTemplateStepType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            name="signature"
            validators={{
              onChange: z.string().min(3, { message: "Signature is required" }),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
                  <Label htmlFor={field.name}>Signature</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={signature}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setSignature(e.target.value);
                    }}
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
          <form.Field name="params">
            {(field) => {
              return (
                <div className="flex flex-col gap-2 mb-4 lg:w-2/3">
                  <Label htmlFor={field.name}>Parameters</Label>
                  <ParamChip
                    defaultValues={params}
                    types={Object.values(ParamType)}
                    onSubmit={(value) => {
                      field.handleChange(value);
                      setParams(value as TemplateStepParameter[]);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Function Definition (Preview)</CardTitle>
            </CardHeader>
            <CardContent>
              <form.Field name="functionDefinition">
                {(field) => {
                  return (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <CodeMirror
                        editable={false}
                        value={functionDefinition}
                        onChange={(value) => {
                          field.handleChange(value);
                          setFunctionDefinition(value);
                        }}
                        height="200px"
                        extensions={[
                          langs.typescript(),
                          EditorView.lineWrapping,
                        ]}
                        theme={githubDark}
                      />
                    </div>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>
        </div>
      </div>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Save"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
