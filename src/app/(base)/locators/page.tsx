import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import React from "react";
import { Code } from "lucide-react";
import LocatorTable from "./locator-table";

const Locators = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>
          <span className="flex items-center">
            <Code className="w-8 h-8 mr-2" />
            Locators
          </span>
        </PageHeader>
        <HeaderSubtitle>
          Locators are the elements that are used to identify the elements on
          the page
        </HeaderSubtitle>
      </div>
      <LocatorTable />
    </>
  );
};

export default Locators;
