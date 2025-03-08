import React from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import FlowDiagram from "@/components/data-visualization/flow-diagram";

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <PageHeader>Dashboard</PageHeader>
        <HeaderSubtitle>
          Welcome to the dashboard. Here you can see your test suites and run
          them.
        </HeaderSubtitle>
      </div>
      <FlowDiagram />
    </div>
  );
};

export default Dashboard;
