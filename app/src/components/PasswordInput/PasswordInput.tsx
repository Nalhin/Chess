import React from 'react';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface Props {
  className?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  color?: 'primary' | 'secondary';
}

const PasswordInput: React.FC<Props> = ({
  onChange,
  value,
  className,
  color = 'primary',
  onKeyDown,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl className={className}>
      <InputLabel htmlFor="password-input" color={color} required>
        Password
      </InputLabel>
      <Input
        id="password-input"
        name="password"
        color={color}
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleShowPassword}
              onMouseDown={handleShowPassword}
              color={color}
            >
              {showPassword ? (
                <Visibility aria-label="hide visibility" />
              ) : (
                <VisibilityOff aria-label="set visible" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

PasswordInput.defaultProps = {
  className: '',
};

export default PasswordInput;
