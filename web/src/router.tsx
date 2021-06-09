import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [accessToken] = useState('lorem');

  return (
    <Router>
      { accessToken ? (
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signin" component={CreateAccount} />
        </Switch>
      )}
    </Router>
  );
};

export default App;
