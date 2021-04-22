import React from 'react';

import Spinner from '@components/Spinner';

const Loading = (props) => (
  <>
    <header className="mb-auto"></header>
    <div className="text-center">
      <Spinner />
    </div>
    <footer className="mt-auto"></footer>
  </>
);

export default Loading;
