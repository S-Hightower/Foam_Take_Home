import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'

import Main from './views/Main';
import Foaming from './views/Foaming';
import NonFoaming from './views/NonFoaming';
import Update from './views/Update';
import Detail from './views/Detail';

function App() {
  return (
    <div className="App">
      <Switch>

      <Route exact path="/">
          <Main />
      </Route>

      <Route exact path="/foaming">
          <Foaming />
      </Route>

      <Route exact path="/notfoaming">
          <NonFoaming />
      </Route>

      <Route exact path="/status/:id">
          <Detail />
      </Route>

      <Route exact path="/status/:id/edit">
          <Update />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
