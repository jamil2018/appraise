import {
  getLocatorByIdAction,
  updateLocatorAction,
} from "@/actions/locator/locator-actions";
import { Locator } from "@prisma/client";
import React from "react";
import LocatorForm from "../../locator-form";

const ModifyLocator = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getLocatorByIdAction(id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const locator = data as Locator;

  return (
    <LocatorForm
      defaultValues={{
        name: locator.name ?? "",
        value: locator.value ?? "",
      }}
      successTitle="Locator updated"
      successMessage="Locator updated successfully"
      onSubmitAction={updateLocatorAction}
      id={id}
    />
  );
};

export default ModifyLocator;
