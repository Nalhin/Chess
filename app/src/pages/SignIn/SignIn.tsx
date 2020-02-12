import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User/User';
import styled from '@emotion/styled';
import {
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  useTheme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Routes } from '../../interfaces/Router/Routes';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const INITIAL_STATE = {
  login: '',
  password: '',
};

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 400px;
  margin: ${props => props.theme.spacing(4)}px auto;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing(0)}px
    ${props => props.theme.spacing(1)}px;
  text-align: right;
`;

const SignIn = () => {
  const [formState, setFormState] = React.useState<UserLoginData>(
    INITIAL_STATE,
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = () => {
    dispatch(loginUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <StyledWrapper>
      <Card>
        <StyledForm theme={theme}>
          <FormControl>
            <InputLabel htmlFor="login-input" color="secondary" required>
              Login
            </InputLabel>
            <Input
              id="login-input"
              name="login"
              color="secondary"
              required
              onChange={onFormChange}
              value={formState.login}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password-input" color="secondary" required>
              Password
            </InputLabel>
            <Input
              id="password-input"
              name="password"
              color="secondary"
              type="password"
              onChange={onFormChange}
              value={formState.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    onMouseDown={handleShowPassword}
                    color="secondary"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <StyledLink to={Routes.signUp} theme={theme}>
            No account?
          </StyledLink>
          <Button
            color="primary"
            variant="contained"
            onClick={submitForm}
            aria-label="login"
          >
            Sign in
          </Button>
        </StyledForm>
      </Card>
    </StyledWrapper>
  );
};

export default SignIn;
