import React from 'react';

import Gallery from '@containers/Gallery';
import Splash from '@containers/Splash';
import Store from '@models/Store';
import { observer } from 'mobx-react';

const Landing = observer(() => {
  if (Store.user) {
    return (<Gallery />);
  }

  return (<Splash />);
});

export default Landing;
