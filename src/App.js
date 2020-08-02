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
import SignUp from './Components/Public/SignUp';
import SignIn from './Components/Public/SignIn';
import ForgotPassword from './Components/Public/ForgotPassword';

import Dashboard from './Components/Private/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
            <Fragment>
              <Switch>
                  <PublicRoute path="/" exact component={SignIn}/>
                  <PublicRoute path="/signup" exact component={SignUp}/>
                  <PublicRoute path="/forgot-password" exact component={ForgotPassword}/>
                  <PrivateRoute path="/dashboard" exact component={Dashboard}/>
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
