import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Redirect fragment.
 * @param {*} props
 */
const redirectTo = (props) => {
  return (
    <Redirect to={{ pathname: props.redirect, state: { from: props.location } }} />
  )
}

/**
 * Setups a private route component.
 * @param {*} allProps
 */
const PrivateRoute = (allProps) => {
  const {children, isAllowed, redirect, ...props} = allProps;
  return (
    <Route { ...props }>
      {allProps.isAllowed ? children : redirectTo({props})}
    </Route>
  )
};

export default PrivateRoute