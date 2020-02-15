import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User/User';
import styled from '@emotion/styled';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  useTheme,
} from '@material-ui/core';
import { Routes } from '../../interfaces/Router/Routes';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useFormState } from '../../components/AuthForm/useFormState';
import { ifFormFieldEmpty } from '../../utils/isFormFieldEmpty';
import { addToast } from '../../store/toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { StyledLink } from '../../components/StyledLink/StyledLink';

const StyledSpan = styled.span`
  padding-right: ${props => props.theme.spacing(1)}px;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const INITIAL_STATE = {
  login: '',
  password: '',
};

const Login = () => {
  const { formState, onFormChange } = useFormState<UserLoginData>(
    INITIAL_STATE,
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const submitForm = () => {
    if (ifFormFieldEmpty(formState)) {
      dispatch(
        addToast(generateToast('Please fill in all fields.', ToastTypes.Error)),
      );
      return;
    }
    dispatch(loginUserRequested(formState));
  };

  return (
    <AuthForm headerText="Login">
      <FormControl>
        <InputLabel htmlFor="login-input" color="primary" required>
          Login
        </InputLabel>
        <Input
          id="login-input"
          name="login"
          color="primary"
          onChange={onFormChange}
          value={formState.login}
        />
      </FormControl>
      <PasswordInput
        value={formState.password}
        onChange={onFormChange}
        color="primary"
      />
      <StyledLinkContainer>
        <StyledSpan theme={theme}>No account?</StyledSpan>
        <StyledLink to={Routes.signUp} color="primary" theme={theme}>
          Sign up
        </StyledLink>
      </StyledLinkContainer>
      <Button color="primary" variant="contained" onClick={submitForm}>
        Login
      </Button>
    </AuthForm>
  );
};

export default Login;
