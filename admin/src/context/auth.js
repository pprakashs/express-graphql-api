import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const accessToken = localStorage.getItem('access_token');

const initialState = {
  user: null,
};

if (accessToken) {
  const decodedToken = jwtDecode(accessToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('access_token');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('access_token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    dispatch({ type: 'logout' });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
