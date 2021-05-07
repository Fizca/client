import React from 'react';

import Navigation from '@components/Navigation';

const Main = (props) => (
  <>
    <Navigation />
    <main role="main">
      <div className="container">
        {props.children}
        <hr/>
      </div>
    </main>

    <footer className="container mt-auto">
      <p>&copy; Company 2021</p>
    </footer>
  </>
);

export default Main;
