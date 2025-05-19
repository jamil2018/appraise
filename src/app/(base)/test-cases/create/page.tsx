import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import React from "react";
import TestCaseForm from "../test-case-form";
import { NodeOrderMap } from "@/types/diagram/diagram";
import { Globe } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import {
  getAllTemplateStepParamsAction,
  getAllTemplateStepsAction,
} from "@/actions/template-step/template-step-actions";
import { Locator, TemplateStep, TemplateStepParameter } from "@prisma/client";
import { getAllLocatorsAction } from "@/actions/locator/locator-actions";

const initialNodesOrder: NodeOrderMap = {
  "1": {
    order: 0,
    label: "Navigate",
    gherkinStep: `Navigate to the "login" page`,
    isFirstNode: true,
    icon: <Globe />,
    parameters: [{ name: "url", value: "https://example.com", order: 1 }],
  },
  "2": {
    order: 1,
    label: "Input",
    gherkinStep: `Click the "login" button`,
    isFirstNode: false,
    icon: <MousePointerClick />,
    parameters: [{ name: "button", value: "login", order: 1 }],
  },
  "3": {
    order: 2,
    label: "Click",
    gherkinStep: `Click the "login" button`,
    isFirstNode: false,
    icon: <MousePointerClick />,
  },
  "4": {
    order: 3,
    label: "Click",
    gherkinStep: `Click the "login" button`,
    isFirstNode: false,
    icon: <MousePointerClick />,
  },
};

const CreateTestCase = async () => {
  const { data: templateStepParams, error: templateStepParamsError } =
    await getAllTemplateStepParamsAction();

  const { data: templateSteps, error: templateStepsError } =
    await getAllTemplateStepsAction();

  const { data: locators, error: locatorsError } = await getAllLocatorsAction();

  if (templateStepParamsError || templateStepsError || locatorsError) {
    return (
      <div>
        Error: {templateStepParamsError || templateStepsError || locatorsError}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <PageHeader>Create Test Case</PageHeader>
        <HeaderSubtitle>
          Create a new test case to run your tests against
        </HeaderSubtitle>
      </div>
      <TestCaseForm
        defaultNodesOrder={initialNodesOrder}
        templateStepParams={templateStepParams as TemplateStepParameter[]}
        templateSteps={templateSteps as TemplateStep[]}
        locators={locators as Locator[]}
      />
    </div>
  );
};

export default CreateTestCase;
