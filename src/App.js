import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Container from '@containers/Container'
import Splash from '@containers/Splash'
import Uploads from '@containers/Uploads'

import './App.css';

function App() {
  return (
      <main className="d-flex h-100 flex-column">
        <BrowserRouter forceRefresh={false}>
          <Switch>
            <Route path='/' component={Splash} exact />
            <Route path='/success' component={Container} exact />
            <Route path='/uploads' component={Uploads} exact />
          </Switch>
        </BrowserRouter>
      </main>
  );
}

export default App;
