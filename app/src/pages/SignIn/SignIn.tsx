import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User';
import Input from '../../components/Input/Input';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { locations } from '../../contants/locations';
import { useTheme } from '@emotion/core';

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

export const StyledContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 400px;
  margin: 0 auto;
  padding: ${props => props.theme.space.large}px;
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: ${props => props.theme.space.small}px
    ${props => props.theme.space.medium}px;
  text-align: right;
  &:visited {
    color: ${props => props.theme.colors.primary};
  }
`;

const SignIn = () => {
  const [formState, setFormState] = React.useState<UserLoginData>(
    INITIAL_STATE,
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(loginUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <StyledWrapper>
      <StyledContainer theme={theme}>
        <Input
          label="Login"
          name="login"
          onChange={onFormChange}
          value={formState.login}
        />
        <Input
          label="Password"
          name="password"
          onChange={onFormChange}
          value={formState.password}
        />
        <StyledLink to={locations.signUp}>Don't have an account?</StyledLink>
        <Button onClick={submitForm}>Sign in</Button>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default SignIn;
