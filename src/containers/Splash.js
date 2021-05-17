import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

import Button from '@components/Button';
import Content from '@components/Content';
import { http } from '@services/Backend';
import Store from '@models/Store';

const Title = styled.h1`
  font-size: 600%;
`;

const ServerUrl = process.env.SERVER_URL;

const Splash = (props) => {
  const handleLogin = async (googleData) => {
    const token = await Store.googleAuth(googleData);
    Store.setAccessToken(token);
    await Store.init();
  }

  return(
    <>
      <header className="mb-auto"></header>
      <Content className="container jumbotron">
        <Title>FIZCA</Title>
        <p>It means soul in muisca!</p>
        <p><a className='btn fz-btn-dark' href={`${ServerUrl}/google/oauth`}>Login</a></p>
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
        />
      </Content>
      <footer className="mt-auto"></footer>
    </>
  );
}

export default Splash;
