"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { StepParameterType, TemplateStepParameter } from "@prisma/client";
import { format } from "date-fns";

interface DynamicFormFieldsProps {
  templateStepParams: TemplateStepParameter[];
  locators: string[];
  onChange?: (
    values: {
      name: string;
      value: string;
      type: StepParameterType;
      order: number;
    }[],
    isValid: boolean
  ) => void;
}

export default function DynamicFormFields({
  templateStepParams,
  locators,
  onChange,
}: DynamicFormFieldsProps) {
  // Memoize uniqueLocators to prevent recreation on every render
  const uniqueLocators = useMemo(() => [...new Set(locators)], [locators]);

  // Create initial values only once when component mounts or when dependencies change
  const initialValues = useMemo(() => {
    const values: { [key: string]: string | number | boolean | Date } = {};

    templateStepParams.forEach((param) => {
      switch (param.type) {
        case "NUMBER":
          values[param.name] = 0;
          break;
        case "STRING":
          values[param.name] = "";
          break;
        case "DATE":
          values[param.name] = new Date();
          break;
        case "BOOLEAN":
          values[param.name] = false;
          break;
        case "LOCATOR":
          values[param.name] = "";
          break;
      }
    });

    return values;
  }, [templateStepParams, uniqueLocators]);

  // Initialize state with initial values
  const [values, setValues] = useState<{
    [key: string]: string | number | boolean | Date;
  }>(initialValues);

  // Update values when an input changes
  const handleInputChange = (
    name: string,
    value: string | number | boolean | Date
  ) => {
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    // Notify parent component of changes
    if (onChange) {
      // We need to calculate formatted values based on the new state
      const formattedValues = templateStepParams.map((param) => {
        let stringValue = "";
        // Use the new value if it's the one that changed, otherwise use the current state
        const currentValue = param.name === name ? value : values[param.name];

        switch (param.type) {
          case "NUMBER":
            stringValue =
              currentValue !== undefined && currentValue !== null
                ? String(currentValue)
                : "";
            break;
          case "STRING":
            stringValue =
              currentValue !== undefined && currentValue !== null
                ? (currentValue as string)
                : "";
            break;
          case "DATE":
            if (
              currentValue &&
              currentValue instanceof Date &&
              typeof currentValue.getTime === "function" &&
              !Number.isNaN(currentValue.getTime())
            ) {
              stringValue = format(currentValue as Date, "dd-MM-yy");
            } else {
              stringValue = "";
            }
            break;
          case "BOOLEAN":
            stringValue =
              currentValue !== undefined && currentValue !== null
                ? String(currentValue)
                : "";
            break;
          case "LOCATOR":
            stringValue =
              currentValue !== undefined && currentValue !== null
                ? (currentValue as string)
                : "";
            break;
        }

        return {
          name: param.name,
          value: stringValue,
          type: param.type,
          order: param.order,
        };
      });

      // Validation function
      const isValid = templateStepParams.every((param) => {
        const v = formattedValues.find((fv) => fv.name === param.name)?.value;
        switch (param.type) {
          case "NUMBER":
            return (
              v !== undefined && v !== null && v !== "" && !isNaN(Number(v))
            );
          case "STRING":
            return v !== undefined && v !== null && v.trim() !== "";
          case "DATE":
            return v !== undefined && v !== null && v !== "";
          case "BOOLEAN":
            return v === "true" || v === "false";
          case "LOCATOR":
            return v !== undefined && v !== null && v !== "";
          default:
            return false;
        }
      });

      onChange(formattedValues, isValid);
    }
  };

  // Render the appropriate input field based on the parameter type
  const renderInputField = (param: TemplateStepParameter) => {
    const { name, type } = param;

    switch (type) {
      case "NUMBER":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={`input-${name}`}>
              {name} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`input-${name}`}
              type="number"
              value={typeof values[name] === "number" ? values[name] : 0}
              onChange={(e) => handleInputChange(name, Number(e.target.value))}
              className="w-full"
              required
            />
          </div>
        );

      case "STRING":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={`input-${name}`}>
              {name} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`input-${name}`}
              type="text"
              value={typeof values[name] === "string" ? values[name] : ""}
              onChange={(e) => handleInputChange(name, e.target.value)}
              className="w-full"
              required
            />
          </div>
        );

      case "DATE":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label>
              {name} <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !values[name] && "text-muted-foreground"
                  )}
                  aria-required="true"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {values[name] instanceof Date ? (
                    format(values[name] as Date, "PPP")
                  ) : (
                    <span className="text-red-500">Pick a date *</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    values[name] instanceof Date
                      ? (values[name] as Date)
                      : undefined
                  }
                  onSelect={(date) => handleInputChange(name, date as Date)}
                  initialFocus
                  required
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case "BOOLEAN":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={`select-${name}`}>
              {name} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={
                typeof values[name] === "boolean"
                  ? String(values[name])
                  : "false"
              }
              onValueChange={(value) =>
                handleInputChange(name, value === "true")
              }
              required
            >
              <SelectTrigger id={`select-${name}`} className="w-full">
                <SelectValue placeholder="Select a value *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case "LOCATOR":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={`select-${name}`}>
              {name} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={typeof values[name] === "string" ? values[name] : ""}
              onValueChange={(value) => handleInputChange(name, value)}
              required
            >
              <SelectTrigger id={`select-${name}`} className="w-full">
                <SelectValue placeholder="Select a locator *" />
              </SelectTrigger>
              <SelectContent>
                {uniqueLocators.map((locator) => (
                  <SelectItem key={locator} value={locator}>
                    {locator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  // Guard: do not render if no parameters
  if (!templateStepParams || templateStepParams.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <fieldset className="border rounded-md p-4">
          <legend className="text-sm font-medium px-2">Parameters</legend>
          <div className="space-y-6">
            {templateStepParams.map((param) => (
              <div key={param.name}>{renderInputField(param)}</div>
            ))}
          </div>
        </fieldset>
      </CardContent>
    </Card>
  );
}
