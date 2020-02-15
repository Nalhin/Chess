export const fakeUser = {
  login: 'fakeName',
  email: 'fakeEmail@email',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

export const fakeLoginUser = {
  login: fakeUser.login,
  password: 'password',
};

export const fakeRegisterUser = {
  ...fakeLoginUser,
  email: fakeUser.email,
};
