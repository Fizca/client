import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from '@components/PrivateRoute';
import Landing from '@containers/Landing'
import Uploads from '@containers/Uploads'
import Store from '@models/Store';

import './App.css';

const App = observer(() => {
  return (
    <main className="d-flex h-100 flex-column">
      <BrowserRouter forceRefresh={false}>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/success' component={Landing} exact />
          <PrivateRoute path="/uploads" isAllowed={Store.user}>
            <Uploads />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </main>
  );
});

export default App;
