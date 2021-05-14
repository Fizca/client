import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

import Store from '@models/Store';

const Title = styled.h1`
  font-size: 6rem;
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
      <header></header>

      <main className="splash">
          <Title>FIZCA</Title>
          <p>It means soul in muisca!</p>
          <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={'single_host_origin'}
          />
      </main>

      <footer className="">
        <p>&copy; Company 2021</p>
      </footer>
    </>
  );
}

export default Splash;
