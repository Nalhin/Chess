export const generatePlaceholderAccount = () => {
  const login = `placeholder-${Math.random()
    .toString(36)
    .substring(7)}`;

  return {
    login: login,
    password: login,
    email: `${login}@placeholder.com`,
  };
};
