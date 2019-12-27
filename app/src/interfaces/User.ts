interface UserBase {
  login: string;
}

export interface User extends UserBase {
  email: string;
}

export interface UserLoginData extends UserBase {
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  email: string;
}
