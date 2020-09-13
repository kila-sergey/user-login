import React, { useContext } from 'react';

import { AuthContext } from './contexts/auth';

import Pages from './pages';
import Header from './components/Header';

const App = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="container">
      {loggedIn && <Header />}
      <Pages loggedIn={loggedIn} />
    </div>
  );
};

export default App;
