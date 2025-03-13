import React from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import FlowDiagram from "@/components/data-visualization/diagram/flow-diagram";
import { Edge, Node } from "@xyflow/react";
import { Check, MousePointerClick, Keyboard } from "lucide-react";

const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Click",
      description: "Click on element",
      isFirstNode: true,
      icon: <MousePointerClick />,
    },
    position: { x: 100, y: 0 },
    type: "optionsHeaderNode",
  },
  {
    id: "2",
    data: {
      label: "Input",
      description: "Fill in input field",
      icon: <Keyboard />,
    },
    position: { x: 300, y: 0 },
    type: "optionsHeaderNode",
  },
  {
    id: "3",
    data: {
      label: "Click",
      description: "Click on element",
      icon: <MousePointerClick />,
    },
    position: { x: 500, y: 0 },
    type: "optionsHeaderNode",
  },
  {
    id: "4",
    data: {
      label: "Validate",
      description: "Validate element contains expected text",
      icon: <Check />,
    },
    position: { x: 700, y: 0 },
    type: "optionsHeaderNode",
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "buttonEdge" },
  { id: "e2-3", source: "2", target: "3", type: "buttonEdge" },
  { id: "e3-4", source: "3", target: "4", type: "buttonEdge" },
];

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
      <FlowDiagram initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default Dashboard;
