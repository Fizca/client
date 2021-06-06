import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Loading from '@components/Loading'
import Navigation from '@components/Navigation';
import PrivateRoute from '@components/PrivateRoute';
import Landing from '@containers/Landing'
import Moments from '@containers/Moments';
import Uploads from '@containers/Uploads'
import MomentForm from '@containers/MomentForm';
import VitalsForm from '@containers/VitalsForm';
import Store from '@models/Store';

import './App.css';

const App = observer(() => {
  useEffect(() => {
    if (!Store.isReady()) {
      Store.init();
    }
  }, []);

  // Display a loading screen while data loads.
  if (!Store.isReady()) {
    return (
      <main>
        <Loading isLoading={true} />
      </main>
    );
  }

  return (
    <BrowserRouter forceRefresh={false}>
      <Navigation />
      <Switch className="hello">
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
        <PrivateRoute path="/vitals_add" isAllowed={Store.user}>
          <VitalsForm />
        </PrivateRoute>
      </Switch>
      <footer>
        <hr/>
        <p>&copy; Company 2021</p>
      </footer>
    </BrowserRouter>
  );
});

export default App;
