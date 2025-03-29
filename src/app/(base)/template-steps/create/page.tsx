import React from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import { TemplateStepForm } from "../template-step-form";
import { createTemplateStepAction } from "@/actions/template-step/template-step-actions";

const CreateTemplateStep = async () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>Create Template Step</PageHeader>
        <HeaderSubtitle>
          Create a new template step to be used in test cases
        </HeaderSubtitle>
      </div>
      <TemplateStepForm
        successTitle="Template Step Created"
        successMessage="The template step has been created successfully"
        onSubmitAction={createTemplateStepAction}
      />
    </>
  );
};

export default CreateTemplateStep;
