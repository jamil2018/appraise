"use client";

import {
  addEdge,
  Background,
  Controls,
  Node,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 0, y: 100 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const FlowDiagram = () => {
  const theme = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <div className="w-[900px] h-[500px]">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={theme.theme as "light" | "dark" | "system"}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
