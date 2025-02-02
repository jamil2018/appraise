// action.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/config/db-config";
import { formOpts } from "@/constants/form-opts/test-suite-form-opts";
import { Prisma } from "@prisma/client";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.name.length < 3) {
      return "Server validation: Name must be at least 3 characters";
    }
  },
});

export default async function createTestSuiteAction(
  _prev: unknown,
  formData: FormData
) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }
  try {
    const session = await auth();
    await prisma.testSuite.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        creator: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    return formData;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
    }
    throw e;
  }
}
