import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '@components/Loading'
import Navigation from '@components/Navigation';
import PrivateRoute from '@components/PrivateRoute';
import Landing from '@containers/Landing'
import Moments from '@containers/Moments';
import Moment from '@containers/Moment';
import Timeline from '@containers/Timeline';
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
        <PrivateRoute path="/moments" isAllowed={Store.user} exact>
          <Moments />
        </PrivateRoute>
        <PrivateRoute path="/timeline/:tag" isAllowed={Store.user}>
          <Timeline />
        </PrivateRoute>
        <PrivateRoute path="/moments/:id" isAllowed={Store.user}>
          <Moment />
        </PrivateRoute>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        transition={Zoom}
        pauseOnHover
      />
      <footer>
        <hr/>
        <p>&copy; Company 2021</p>
      </footer>
    </BrowserRouter>
  );
});

export default App;
