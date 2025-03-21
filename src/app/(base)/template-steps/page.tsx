import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import PageHeader from "@/components/typography/page-header";
import React from "react";
import TemplateStepTable from "./template-step-table";

const TemplateSteps = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>Template Steps</PageHeader>
        <HeaderSubtitle>
          Template steps are the steps that are used to define a reusable test
          step
        </HeaderSubtitle>
      </div>
      <TemplateStepTable />
    </>
  );
};

export default TemplateSteps;
