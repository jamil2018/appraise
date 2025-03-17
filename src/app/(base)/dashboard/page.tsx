"use client";
import React, { useState, useCallback } from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import FlowDiagram from "@/components/data-visualization/diagram/flow-diagram";
import { MousePointerClick } from "lucide-react";
import { Globe, Keyboard } from "lucide-react";
import { NodeOrderMap } from "@/types/diagram/diagram";

const initialNodesOrder = {
  "1": {
    order: 0,
    label: "Navigate",
    description: "Navigate to the login page",
    isFirstNode: true,
    icon: <Globe />,
  },
  "2": {
    order: 1,
    label: "Input",
    description: "Fill in the username field with value 'admin'",
    isFirstNode: false,
    icon: <Keyboard />,
  },
  "3": {
    order: 2,
    label: "Input",
    description: "Fill in the password field with value 'password'",
    isFirstNode: false,
    icon: <Keyboard />,
  },
  "4": {
    order: 3,
    label: "Click",
    description: "Click the login button",
    isFirstNode: false,
    icon: <MousePointerClick />,
  },
};

const Dashboard = () => {
  const [nodesOrder, setNodesOrder] = useState<NodeOrderMap>({});

  const handleNodeOrderChange = useCallback(
    (nodeOrder: NodeOrderMap) => {
      setNodesOrder(nodeOrder);
    },
    [setNodesOrder]
  );
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
      <FlowDiagram
        nodeOrder={initialNodesOrder}
        onNodeOrderChange={handleNodeOrderChange}
      />
    </div>
  );
};

export default Dashboard;
