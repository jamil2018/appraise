import FlowDiagram from "@/components/data-visualization/diagram/flow-diagram";
import { NodeOrderMap } from "@/types/diagram/diagram";
import React, { useCallback, useEffect, useState, useRef } from "react";

function useDebouncedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: T) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const TestCaseFlow = ({
  initialNodesOrder,
  onNodeOrderChange,
}: {
  initialNodesOrder: NodeOrderMap;
  onNodeOrderChange: (nodesOrder: NodeOrderMap) => void;
}) => {
  const [nodesOrder, setNodesOrder] = useState<NodeOrderMap>(initialNodesOrder);

  const handleNodeOrderChange = useCallback(
    (nodeOrder: NodeOrderMap) => {
      setNodesOrder(nodeOrder);
    },
    [setNodesOrder]
  );

  const debouncedSaveNodesOrder = useDebouncedCallback(onNodeOrderChange, 200);

  useEffect(() => {
    debouncedSaveNodesOrder(nodesOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesOrder]);

  return (
    <>
      <FlowDiagram
        nodeOrder={nodesOrder}
        onNodeOrderChange={handleNodeOrderChange}
      />
    </>
  );
};

export default TestCaseFlow;
