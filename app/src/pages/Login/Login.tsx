import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User';

const INITIAL_STATE = {
  login: '',
  password: '',
};

const Login = () => {
  const [formState, setFormState] = React.useState<UserLoginData>(
    INITIAL_STATE,
  );
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(loginUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <input name="login" onChange={onFormChange} value={formState.login} />
      <input
        name="password"
        onChange={onFormChange}
        value={formState.password}
      />
      <button onClick={submitForm} />
    </div>
  );
};

export default Login;
