export type NodeData = {
  order: number;
  label: string;
  gherkinStep?: string;
  isFirstNode?: boolean;
  icon?: React.ReactNode;
  parameters?: { name: string; value: string; order: number }[];
};

export type NodeOrderMap = Record<string, NodeData>;
