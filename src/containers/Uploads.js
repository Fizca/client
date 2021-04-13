import React from 'react';
import styled from 'styled-components';

import Navigation from '@containers/Navigation';
import FileInput from '@components/FileInput';

const Title = styled.h1`
  color: #1F2833;
  font-size: 400%;
`;

const Img = styled.img`
  width: 200px;
  height: 250px;
`;

const Uploads = (props) => (
  <>
    <Navigation />
    <main role="main">
      <div className="container">
        <FileInput />
        <hr/>
      </div>
    </main>

    <footer className="container mt-auto">
      <p>&copy; Company 2021</p>
    </footer>
  </>
);

export default Uploads;
