import { Route, Redirect, RouteProps } from 'react-router-dom';

interface RedirectProps {
  redirect?: string;
  location?: unknown;
}

/**
 * Redirect fragment.
 */
const redirectTo = (props: RedirectProps) => {
  return (
    <Redirect to={{ pathname: props.redirect, state: { from: props.location } }} />
  )
}

type Props = {
  component?: React.ComponentType<unknown>;
  isAllowed?: unknown;
  redirect?: string;
  children?: React.ReactNode;
} & RouteProps;

/**
 * Setups a private route component.
 */
const PrivateRoute = (allProps: Props) => {
  const { children, isAllowed, redirect, ...props } = allProps;
  return (
    <Route { ...props }>
      {allProps.isAllowed ? children : redirectTo({ redirect, location: allProps.location })}
    </Route>
  )
};

export default PrivateRoute
