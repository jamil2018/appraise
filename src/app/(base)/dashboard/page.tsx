"use client";
import React, { useState, useCallback } from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import { MousePointerClick } from "lucide-react";
import { Globe, Keyboard } from "lucide-react";
import { NodeOrderMap } from "@/types/diagram/diagram";
import TestCaseFlow from "../test-cases/test-case-flow";

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
    gherkinStep: `Fill in the "username" field with value "admin"`,
    isFirstNode: false,
    icon: <Keyboard />,
    parameters: [
      { name: "field", value: "username", order: 1 },
      { name: "value", value: "admin", order: 2 },
    ],
  },
  "3": {
    order: 2,
    label: "Input",
    gherkinStep: `Fill in the "password" field with value "secret"`,
    isFirstNode: false,
    icon: <Keyboard />,
    parameters: [
      { name: "field", value: "password", order: 1 },
      { name: "value", value: "secret", order: 2 },
    ],
  },
  "4": {
    order: 3,
    label: "Click",
    gherkinStep: `Click the "login" button`,
    isFirstNode: false,
    icon: <MousePointerClick />,
    parameters: [{ name: "button", value: "login", order: 1 }],
  },
};

const Dashboard = () => {
  const [nodesOrder, setNodesOrder] = useState<NodeOrderMap>({});

  const saveNodesOrder = useCallback((nodesOrder: NodeOrderMap) => {
    setNodesOrder(nodesOrder);
  }, []);

  console.log("nodesOrder:", nodesOrder);

  return (
    <div>
      <div className="mb-8">
        <PageHeader>Dashboard</PageHeader>
        <HeaderSubtitle>
          Welcome to the dashboard. Here you can see your test suites and run
          them.
        </HeaderSubtitle>
      </div>
      <TestCaseFlow
        initialNodesOrder={initialNodesOrder}
        onNodeOrderChange={saveNodesOrder}
      />
    </div>
  );
};

export default Dashboard;
