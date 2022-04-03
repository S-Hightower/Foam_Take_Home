import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'

import Main from './views/Main';
import Foaming from './views/Foaming';
import NonFoaming from './views/NonFoaming';

function App() {
  return (
    <div className="App">
      <Switch>

      <Route exact path="/">
          <Main />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
