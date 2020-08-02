import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './../Layouts/Navbar';
import { getUID } from './Common';
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getUID() ? <Fragment><Navbar/><Component {...props} /></Fragment> : <Redirect to={'/'} />}
    />
  )
}
 
export default PrivateRoute;