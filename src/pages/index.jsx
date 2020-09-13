import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LOGIN_PATH, PROFILE_PATH } from '../constants/router-constants';

const LoginPage = lazy(() => import('./LoginPage'));
const ProfilePage = lazy(() => import('./ProfilePage'));

const Pages = ({ loggedIn }) => (
  <Suspense key={loggedIn} fallback={<div>Loading...</div>}>
    <Switch>
      {!loggedIn && (
      <>
        <Route path={LOGIN_PATH} exact component={LoginPage} />
        <Redirect to={LOGIN_PATH} />

      </>
      )}

      {loggedIn && (
        <>
          <Route path={PROFILE_PATH} exact component={ProfilePage} />
          <Redirect to={PROFILE_PATH} />
        </>
      )}

    </Switch>
  </Suspense>
);

Pages.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Pages;
