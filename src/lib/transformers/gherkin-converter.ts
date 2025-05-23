export const generateGherkinStep = (
  signature: string,
  parameters: { value: string; order: number }[]
) => {
  const signatureParts = signature.split(" ");
  const sortedParameters = parameters.sort((a, b) => a.order - b.order);

  const gherkinStep = signatureParts
    .map((part) => {
      if (
        part === "{string}" ||
        part === "{int}" ||
        part === "{float}" ||
        part === "{boolean}"
      ) {
        const parameter = sortedParameters.shift();
        if (parameter) {
          return parameter.value;
        }
      }
      return part;
    })
    .join(" ");

  return gherkinStep;
};

console.log(
  generateGherkinStep("I have {int} apples", [
    { value: "1", order: 0 },
    { value: "2", order: 1 },
  ])
);
