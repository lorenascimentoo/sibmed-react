export const Token = "@sibmed-Token";
export const isAuthenticated = () => localStorage.getItem(Token) !== null ;
export const getToken = () => localStorage.getItem(Token);
export const login = token => {
  localStorage.setItem(Token, token);
};

export const logout = () => {
  localStorage.removeItem(Token);
};