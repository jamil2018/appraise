import { memo } from "react";

import { NodeProps, Handle, Position } from "@xyflow/react";

import { BaseNode } from "@/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderIcon,
  NodeHeaderDeleteAction,
} from "@/components/node-header";

interface OptionsHeaderNodeData {
  label: string;
  description: string;
  isFirstNode?: boolean;
  icon?: React.ReactNode;
}

const OptionsHeaderNode = memo(({ selected, data }: NodeProps) => {
  OptionsHeaderNode.displayName = "OptionsHeaderNode";

  const { label, description, isFirstNode, icon } =
    data as unknown as OptionsHeaderNodeData;

  return (
    <BaseNode selected={selected} className="px-3 py-2 w-52">
      {!isFirstNode && <Handle type="target" position={Position.Left} />}
      <NodeHeader className="-mx-3 -mt-2 border-b">
        <NodeHeaderIcon>{icon}</NodeHeaderIcon>
        <NodeHeaderTitle>{label}</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderDeleteAction />
        </NodeHeaderActions>
      </NodeHeader>
      <div className="mt-2">{description}</div>
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
});

export default OptionsHeaderNode;
