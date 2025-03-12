import React from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import FlowDiagram from "@/components/data-visualization/diagram/flow-diagram";
import { Edge, Node } from "@xyflow/react";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Node 1", name: "Click" },
    position: { x: 100, y: 0 },
  },
  {
    id: "2",
    data: { label: "Node 2", name: "Click" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3", name: "Click" },
    position: { x: 100, y: 200 },
  },
  {
    id: "4",
    data: { label: "Node 4", name: "Click" },
    position: { x: 100, y: 300 },
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
