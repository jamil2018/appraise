"use client";

import {
  addEdge,
  Background,
  ConnectionMode,
  Controls,
  Edge,
  Node,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "../../ui/button";
import ButtonEdge from "./button-edge";
import { Plus } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import OptionsHeaderNode from "./options-header-node";

const edgeTypes = {
  buttonEdge: ButtonEdge,
};
const nodeTypes = {
  optionsHeaderNode: OptionsHeaderNode,
};

const FlowDiagram = ({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAddNodeDialog, setShowAddNodeDialog] = useState(false);
  const [nodeOrders, setNodeOrders] = useState<Record<string, number>>({});

  const determineNodeOrders = useCallback((nodes: Node[], edges: Edge[]) => {
    // Create adjacency list
    const graph: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    const hasConnections: Record<string, boolean> = {};
    const nodeIds = new Set(nodes.map((node) => node.id));

    // Initialize graph, inDegree, and hasConnections
    nodes.forEach((node) => {
      graph[node.id] = [];
      inDegree[node.id] = 0;
      hasConnections[node.id] = false;
    });

    // Build graph - only include edges where both source and target nodes exist
    edges.forEach((edge) => {
      if (
        edge.source &&
        edge.target &&
        nodeIds.has(edge.source) &&
        nodeIds.has(edge.target)
      ) {
        graph[edge.source].push(edge.target);
        inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
        hasConnections[edge.source] = true;
        hasConnections[edge.target] = true;
      }
    });

    // Find nodes with no incoming edges
    const queue = nodes
      .map((node) => node.id)
      .filter((id) => inDegree[id] === 0 && hasConnections[id]);

    const orders: Record<string, number> = {};
    let order = 1;

    // First mark all isolated nodes with -1
    nodes.forEach((node) => {
      if (!hasConnections[node.id]) {
        orders[node.id] = -1;
      }
    });

    // Process queue
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      orders[currentId] = order++;

      // Process neighbors
      graph[currentId].forEach((neighborId) => {
        inDegree[neighborId]--;
        if (inDegree[neighborId] === 0) {
          queue.push(neighborId);
        }
      });
    }

    // Handle any remaining nodes (cycles)
    nodes.forEach((node) => {
      if (!orders[node.id]) {
        orders[node.id] = order++;
      }
    });

    return orders;
  }, []);

  useEffect(() => {
    const orders = determineNodeOrders(nodes, edges);
    setNodeOrders(orders);
    console.log("Node orders:", orders);
  }, [nodes, edges, determineNodeOrders]);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: crypto.randomUUID(),
      data: { label: `Node new` },
      position: { x: 0, y: 0 },
      type: "optionsHeaderNode",
    };
    setNodes((nds) => nds.concat(newNode));
    setShowAddNodeDialog(false);
  }, [setNodes, setShowAddNodeDialog]);

  console.log(nodeOrders);
  return (
    <>
      <div className="w-full h-[500px]">
        <div className="mb-8">
          <Button onClick={() => setShowAddNodeDialog(true)}>
            <span className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </span>
          </Button>
        </div>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
          connectionMode={ConnectionMode.Loose}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: "buttonEdge",
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <Dialog open={showAddNodeDialog} onOpenChange={setShowAddNodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Node</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={addNode}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlowDiagram;
