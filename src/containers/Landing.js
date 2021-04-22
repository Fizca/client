import React, { useEffect } from 'react';

import Gallery from '@containers/Gallery';
import Loading from '@containers/Loading';
import Splash from '@containers/Splash';
import Store, {empty, loading} from '@models/Store';
import { observer } from 'mobx-react';

const Landing = observer((props) => {
  // If the status is empty, attempt to load the user into the store.
  useEffect(() => {
    if (Store.status === empty) {
      Store.loadUser();
    }
  });

  // Display a loading screen while data loads.
  if (Store.status === loading) {
    return (<Loading />);
  }

  if (Store.user) {
    return (<Gallery />);
  }

  return (<Splash />);
});

export default Landing;
