import React, {
  useMemo, useCallback, useState, createContext,
} from 'react';
import PropTypes from 'prop-types';

import api from '../api';

export const AuthContext = createContext();

export const { Consumer: AuthConsumer } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => api.isLoggedIn());

  const login = useCallback(async (email, password) => {
    await api.login(email, password);

    setLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await api.logout();

    setLoggedIn(false);
  }, []);

  const contextValue = useMemo(() => ({ login, logout, loggedIn }), [loggedIn]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};
