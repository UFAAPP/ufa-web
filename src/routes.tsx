import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
