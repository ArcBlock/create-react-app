import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import Home from './pages/Home';
import QueryDemo from './pages/Query';
import SubscriptionDemo from './pages/Subscription';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/query" component={QueryDemo} />
      <Route path="/subscription" component={SubscriptionDemo} />
    </div>
  </Router>
);
export default App;
