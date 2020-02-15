export const ifFormFieldEmpty = (formState: Record<string, any>) => {
  return !Object.values(formState).every(value => value);
};
