import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

import PrivateRoute from '@components/PrivateRoute';
import Landing from '@containers/Landing'
import Loading from '@containers/Loading'
import Moments from '@containers/Moments';
import Uploads from '@containers/Uploads'
import MomentForm from '@containers/MomentForm';
import Store from '@models/Store';

import './App.css';
import Moments from '@containers/Moments';

const App = observer(() => {
  useEffect(() => {
    if (!Store.isReady()) {
      Store.init();
    }
  }, []);

  // Display a loading screen while data loads.
  if (!Store.isReady()) {
    return (
      <main className="d-flex h-100 flex-column">
        <Loading />;
      </main>
    );
  }

  return (
    <main className="d-flex h-100 flex-column">
      <BrowserRouter forceRefresh={false}>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/success' component={Landing} exact />
          <PrivateRoute path="/uploads" isAllowed={Store.user}>
            <Uploads />
          </PrivateRoute>
          <PrivateRoute path="/moments" isAllowed={Store.user}>
            <Moments />
          </PrivateRoute>
          <PrivateRoute path="/moments_add" isAllowed={Store.user}>
            <MomentForm />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </main>
  );
});

export default App;
