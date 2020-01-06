import React from 'react';
import { useDispatch } from 'react-redux';
import { UserRegisterData } from '../../interfaces/User';
import { registerUserRequested } from '../../store/user/user.actions';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { StyledContainer, StyledLink, StyledWrapper } from '../SignIn/SignIn';
import { locations } from '../../contants/locations';

const INITIAL_STATE = {
  login: '',
  password: '',
  email: '',
};

const SignUp = () => {
  const [formState, setFormState] = React.useState<UserRegisterData>(
    INITIAL_STATE,
  );
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(registerUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <Input
          label="Login"
          name="login"
          onChange={onFormChange}
          value={formState.login}
        />
        <Input
          label="Email"
          name="email"
          onChange={onFormChange}
          value={formState.email}
        />
        <Input
          label="Password"
          name="password"
          onChange={onFormChange}
          value={formState.password}
        />
        <StyledLink to={locations.signIn}>Sign in?</StyledLink>
        <Button onClick={submitForm}>Sign up</Button>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default SignUp;
