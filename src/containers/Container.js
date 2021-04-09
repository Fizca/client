import React from 'react';
import styled from 'styled-components';

import Navigation from '@containers/Navigation';

const Title = styled.h1`
  color: #1F2833;
  font-size: 400%;
`;

const Container = (props) => (
  <div className="container h-100 test1">
    <Navigation />
    <div className="container-fluid h-100 content-lt test2">
      <Title>Welcome!</Title>
    </div>
  </div>
);

export default Container;
