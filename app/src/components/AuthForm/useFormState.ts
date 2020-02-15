import React from 'react';

export function useFormState<T>(initialState: T) {
  const [formState, setFormState] = React.useState<T>(initialState);

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return { formState, onFormChange };
}
