import FlowDiagram from "./diagram/flow-diagram";
import { NodeOrderMap } from "@/types/diagram/diagram";
import { Locator, TemplateStep, TemplateStepParameter } from "@prisma/client";
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
  templateStepParams,
  templateSteps,
  locators,
  onNodeOrderChange,
}: {
  initialNodesOrder: NodeOrderMap;
  templateStepParams: TemplateStepParameter[];
  templateSteps: TemplateStep[];
  locators: Locator[];
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
        templateStepParams={templateStepParams}
        onNodeOrderChange={handleNodeOrderChange}
        templateSteps={templateSteps}
        locators={locators}
      />
    </>
  );
};

export default TestCaseFlow;
