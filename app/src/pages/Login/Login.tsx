import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User/User';
import styled from '@emotion/styled';
import { FormControl, Input, InputLabel, useTheme } from '@material-ui/core';
import { Routes } from '../../interfaces/Router/Routes';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useFormState } from '../../components/AuthForm/useFormState';
import { isAnyFormFieldEmpty } from '../../utils/isAnyFormFieldEmpty';
import { addToast } from '../../store/toaster/toaster.action';
import { generateToast } from '../../utils/generateToast';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { StyledLink } from '../../components/StyledLink/StyledLink';
import { userLoadingSelector } from '../../store/user/user.selectors';
import ButtonWithLoader from '../../components/ButtonWithLoader/ButtonWithLoader';

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
  const isLoading = useSelector(userLoadingSelector);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  };

  const submitForm = () => {
    if (isAnyFormFieldEmpty(formState)) {
      dispatch(
        addToast(generateToast('Please fill in all fields.', ToastTypes.Error)),
      );
      return;
    }
    dispatch(loginUserRequested(formState));
  };

  return (
    <AuthForm headerText="Login">
      <FormControl data-testid={Routes.login}>
        <InputLabel htmlFor="login-input" color="primary" required>
          Login
        </InputLabel>
        <Input
          id="login-input"
          name="login"
          color="primary"
          onChange={onFormChange}
          value={formState.login}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <PasswordInput
        value={formState.password}
        onChange={onFormChange}
        color="primary"
        onKeyDown={handleKeyDown}
      />
      <StyledLinkContainer>
        <StyledSpan theme={theme}>No account?</StyledSpan>
        <StyledLink to={Routes.signUp} color="primary" theme={theme}>
          Sign up
        </StyledLink>
      </StyledLinkContainer>
      <ButtonWithLoader isLoading={isLoading} onClick={submitForm}>
        Continue
      </ButtonWithLoader>
    </AuthForm>
  );
};

export default Login;
