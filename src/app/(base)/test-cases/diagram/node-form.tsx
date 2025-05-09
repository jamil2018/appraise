import React from "react";
import { NodeData } from "@/constants/form-opts/diagram/node-form";

const NodeForm = ({
  onSubmitAction,
  initialValues,
}: {
  onSubmitAction: (values: NodeData) => void;
  initialValues: NodeData;
}) => {
  return <div>NodeForm</div>;
};

export default NodeForm;
