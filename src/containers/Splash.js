import React from 'react';
import styled from 'styled-components';

import Button from '@components/Button';
import Content from '@components/Content';

const Title = styled.h1`
  font-size: 600%;
`;

const Splash = (props) => (
  <>
    <header className="mb-auto">
    </header>
    <Content className="container">
      <Title>FIZCA</Title>
      <p>It means soul in muisca!</p>
      <p><Button>HELLO</Button></p>
      <p><a href="/success">Success</a></p>
    </Content>
    <footer className="mt-auto">
    </footer>
  </>
);

export default Splash;