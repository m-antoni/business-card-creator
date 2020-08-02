import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUID } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getUID() ? <Component {...props} /> : <Redirect to={'/'} />}
    />
  )
}
 
export default PrivateRoute;