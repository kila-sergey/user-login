import React, { useContext } from 'react';

import ExitButton from '../Buttons/ExitButton';

import { AuthContext } from '../../contexts/auth';

import styles from './Header.module.scss';

const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <ExitButton onClick={logout} name="Logout" />
    </div>
  );
};
export default Header;
