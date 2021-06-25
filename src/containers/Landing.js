import React from 'react';

import Moments from '@containers/Moments';
import Splash from '@containers/Splash';
import Store from '@models/Store';
import { observer } from 'mobx-react';

const Landing = observer(() => {
  if (Store.user) {
    return (<Moments />);
  }

  return (<Splash />);
});

export default Landing;
