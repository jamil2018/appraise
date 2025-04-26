import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import PageHeader from "@/components/typography/page-header";
import React from "react";
import TemplateStepTable from "./template-step-table";
import { LayoutTemplate } from "lucide-react";

const TemplateSteps = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>
          <span className="flex items-center">
            <LayoutTemplate className="w-8 h-8 mr-2" />
            Template Steps
          </span>
        </PageHeader>
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
