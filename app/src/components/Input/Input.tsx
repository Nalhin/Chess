import React from 'react';
import { TextField } from '@material-ui/core';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledTextField = styled(TextField)`
  margin: ${props => props.theme.space.medium}px;
`;

interface Props {
  label?: string;
  name?: string;
  required?: boolean;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => any;
}

const Input: React.FC<Props> = ({
  value,
  label,
  required,
  onChange,
  name,
  className,
  placeholder,
  onKeyDown,
}) => {
  const theme = useTheme();

  return (
    <StyledTextField
      theme={theme}
      label={label}
      name={name}
      required={required}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={className}
      onKeyDown={onKeyDown}
      type="text"
    />
  );
};

Input.defaultProps = {
  required: false,
};

export default Input;
