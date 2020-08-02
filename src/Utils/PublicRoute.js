import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUID } from './Common';

 
// handle the public routes
function PublicRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => !getUID() ? <Component {...props} /> : <Redirect to={'/auth/dashboard'} />}
    />
  )
}
 
export default PublicRoute;