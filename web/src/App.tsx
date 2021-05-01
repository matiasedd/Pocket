import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;
