export const isAnyFormFieldEmpty = (formState: Record<string, any>) => {
  return !Object.values(formState).every(value => value);
};
