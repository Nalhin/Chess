import React from 'react';
import { useDispatch } from 'react-redux';
import { UserRegisterData } from '../../interfaces/User';
import { registerUserRequested } from '../../store/user/user.actions';

const INITIAL_STATE = {
  login: '',
  password: '',
  email: '',
};

const Register = () => {
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
    <div>
      <input name="login" onChange={onFormChange} value={formState.login} />
      <input name="email" onChange={onFormChange} value={formState.email} />
      <input
        name="password"
        onChange={onFormChange}
        value={formState.password}
      />
      <button onClick={submitForm}>Register</button>
    </div>
  );
};

export default Register;
