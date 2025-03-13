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
import { useCallback, useState } from "react";
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

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: crypto.randomUUID(),
      data: { label: `Node new` },
      position: { x: 0, y: 0 },
      type: "OptionsHeaderNode",
    };
    setNodes((nds) => nds.concat(newNode));
    setShowAddNodeDialog(false);
  }, [setNodes, setShowAddNodeDialog]);

  return (
    <>
      <div className="w-[900px] h-[500px]">
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
