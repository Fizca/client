import React from 'react';
import styled from 'styled-components';

import Button from '@components/Button';
import Content from '@components/Content';

const Title = styled.h1`
  font-size: 600%;
`;

const ServerUrl = process.env.SERVER_URL;

const Splash = (props) => (
  <>
    <header className="mb-auto"></header>
    <Content className="container jumbotron">
      <Title>FIZCA</Title>
      <p>It means soul in muisca!</p>
      <p><a className='btn fz-btn-dark' href={`http://${ServerUrl}/google/oauth`}>Login</a></p>
    </Content>
    <footer className="mt-auto"></footer>
  </>
);

export default Splash;