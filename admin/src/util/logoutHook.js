import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from './../context/auth';

export const useLogout = () => {
  const context = useContext(AuthContext);
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    context.logout();
    history.push('/login');
  };

  return {
    logout,
  };
};
