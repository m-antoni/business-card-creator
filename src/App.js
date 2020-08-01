import React, { Fragment } from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Layouts/css/Global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor }  from './store';

// Routes
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Home from './Components/Public/Home';
import Generate from './Components/Public/Generate';
import QuaratinePass from './Components/Public/QuaratinePass';
import TravelPass from './Components/Public/TravelPass';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
            <Fragment>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/generate" exact component={Generate}/>
                  <Route path="/generate/quarantine-pass" exact component={QuaratinePass}/>
                  <Route path="/generate/travel-pass" exact component={TravelPass}/>
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
