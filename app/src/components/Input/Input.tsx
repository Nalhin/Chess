import React from 'react';
import { TextField } from '@material-ui/core';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledTextField = styled(TextField)`
  margin: ${props => props.theme.space.medium}px;
`;

interface Props {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ value, label, required, onChange, name }) => {
  const theme = useTheme();

  return (
    <StyledTextField
      theme={theme}
      label={label}
      name={name}
      required={required}
      onChange={onChange}
      value={value}
      type="text"
    />
  );
};

Input.defaultProps = {
  required: false,
};

export default Input;
