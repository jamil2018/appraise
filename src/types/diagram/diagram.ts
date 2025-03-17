export type NodeData = {
  order: number;
  label: string;
  description?: string;
  isFirstNode?: boolean;
  icon?: React.ReactNode;
};

export type NodeOrderMap = Record<string, NodeData>;
