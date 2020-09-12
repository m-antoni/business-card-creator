import React, { Fragment } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'mdbreact/dist/css/mdb.css';
import './Layouts/css/Global.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import QuizView from './Components/Private/QuizView';
import Dashboard from './Components/Private/Dashboard';
import QuizResult from './Components/Private/QuizResult';

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
                  <PrivateRoute path="/dashboard/quiz" exact component={QuizView}/>
                  <PrivateRoute path="/dashboard/quiz/result" exact component={QuizResult}/>
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
