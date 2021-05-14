import React from 'react';

import Navigation from '@components/Navigation';

const Main = (props) => (
  <>
    <Navigation />
    <main className="content">
        {props.children}
    </main>

    <footer className="">
      <hr/>
      <p>&copy; Company 2021</p>
    </footer>
  </>
);

export default Main;
