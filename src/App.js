import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { SelectPlayers } from './app/select-players';
import CardGame from './app/card-game';

import './app.scss';

const store = createStore(rootReducer);

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <div className="app-container">
                <Switch>
                  <Route exact path='/' component={SelectPlayers}/>
                  <Route exact path='/game/:totalPlayers' render={props => <CardGame {...props} />} />
                </Switch>
            </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
