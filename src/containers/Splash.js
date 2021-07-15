import React from 'react';
import GoogleLogin from 'react-google-login';

import Quote from '@components/Quote';
import Store from '@models/Store';

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
        <div>
          <Quote>
              <div className="blockquote">
                <h1>
                  You become responsible, <span style={{color: 'var(--highlight)'}}>forever</span>, for what you have tamed.
                </h1>
                <h4>&mdash;Antoine de Saint-Exupéry</h4>
              </div>
          </Quote>
          <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
                theme='dark'
            />
          </div>
        </div>
      </main>

      {/* <div className="wrapper">
            <div className="the-fox">
              <div className="fox-face">
                <section className="eyes left"></section>
                <section className="eyes right"></section>
                <span className="nose"></span>
                <div className="white-part"><span className="mouth"></span></div>
              </div>
            </div>
          </div> */}
    </>
  );
}

export default Splash;
