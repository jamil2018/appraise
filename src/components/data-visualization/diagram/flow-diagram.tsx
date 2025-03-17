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
  Connection,
} from "@xyflow/react";
import { useCallback, useState, useEffect, useMemo } from "react";
import "@xyflow/react/dist/style.css";
import { Button } from "../../ui/button";
import ButtonEdge from "./button-edge";
import { Plus } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import OptionsHeaderNode from "./options-header-node";
import { NodeOrderMap } from "@/types/diagram/diagram";

const edgeTypes = {
  buttonEdge: ButtonEdge,
};
const nodeTypes = {
  optionsHeaderNode: OptionsHeaderNode,
};

const FlowDiagram = ({
  nodeOrder,
  onNodeOrderChange,
}: {
  nodeOrder: NodeOrderMap;
  onNodeOrderChange: (nodeOrder: NodeOrderMap) => void;
}) => {
  const generateInitialNodesAndEdges = useCallback(
    (nodeOrder: NodeOrderMap) => {
      const nodes: Node[] = [];
      const edges: Edge[] = [];

      // Sort entries by order value
      const sortedEntries = Object.entries(nodeOrder).sort(
        ([, nodeDataA], [, nodeDataB]) => nodeDataA.order - nodeDataB.order
      );

      // Create nodes
      sortedEntries.forEach(([id, nodeData], index) => {
        const baseNodeData = {
          label: nodeData.label,
          description: nodeData.description || "",
          isFirstNode: nodeData.isFirstNode || false,
          icon: nodeData.icon || "",
        };

        // Skip isolated nodes (order === -1)
        if (nodeData.order === -1) {
          nodes.push({
            id,
            data: baseNodeData,
            position: { x: 0, y: index * 100 }, // Stack isolated nodes vertically
            type: "optionsHeaderNode",
          });
          return;
        }

        nodes.push({
          id,
          data: baseNodeData,
          position: { x: nodeData.order * 500, y: 0 }, // Space nodes horizontally based on order
          type: "optionsHeaderNode",
        });

        // Create edges between consecutive nodes
        if (index < sortedEntries.length - 1) {
          const nextEntry = sortedEntries[index + 1];
          // Only create edge if both nodes have valid orders (not -1)
          if (
            nodeData.order !== -1 &&
            nextEntry[1].order !== -1 &&
            nodeData.order === nextEntry[1].order - 1
          ) {
            edges.push({
              id: `${id}-${nextEntry[0]}`,
              source: id,
              target: nextEntry[0],
              type: "buttonEdge",
            });
          }
        }
      });

      return { nodes, edges };
    },
    []
  );

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateInitialNodesAndEdges(nodeOrder),
    [nodeOrder, generateInitialNodesAndEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAddNodeDialog, setShowAddNodeDialog] = useState(false);

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

    const orders: NodeOrderMap = {};
    let orderNum = 1;

    // First mark all isolated nodes with -1
    nodes.forEach((node) => {
      if (!hasConnections[node.id]) {
        orders[node.id] = {
          order: -1,
          label: node.data.label as string,
          description: node.data.description as string | undefined,
          isFirstNode: node.data.isFirstNode as boolean | undefined,
          icon: node.data.icon as React.ReactNode | undefined,
        };
      }
    });

    // Process queue
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentNode = nodes.find((node) => node.id === currentId)!;
      orders[currentId] = {
        order: orderNum++,
        label: currentNode.data.label as string,
        description: currentNode.data.description as string | undefined,
        isFirstNode: currentNode.data.isFirstNode as boolean | undefined,
        icon: currentNode.data.icon as React.ReactNode | undefined,
      };

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
        orders[node.id] = {
          order: orderNum++,
          label: node.data.label as string,
          description: node.data.description as string | undefined,
          isFirstNode: node.data.isFirstNode as boolean | undefined,
          icon: node.data.icon as React.ReactNode | undefined,
        };
      }
    });

    return orders;
  }, []);

  useEffect(() => {
    const orders = determineNodeOrders(nodes, edges);
    onNodeOrderChange(orders);
  }, [nodes, edges, determineNodeOrders, onNodeOrderChange]);

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      // Check if source node already has an outgoing connection
      const hasSourceConnection = edges.some(
        (edge) => edge.source === connection.source
      );

      // Check if target node already has an incoming connection
      const hasTargetConnection = edges.some(
        (edge) => edge.target === connection.target
      );

      return !hasSourceConnection && !hasTargetConnection;
    },
    [edges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      if (isValidConnection(params)) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [setEdges, isValidConnection]
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
          connectOnClick={false}
          isValidConnection={isValidConnection}
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
