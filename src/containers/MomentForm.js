import React, { useEffect, useState } from 'react';

import Navigation from '@containers/Navigation';
import { http } from '@services/Backend';
import FileInput from '@components/FileInput';

const MomentForm = () => {

  return (<>
    <Navigation />
    <main role="main">
      <div className="container">
        <form>
          <div className="form-group row">
            {/* <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label> */}
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" placeholder="Title" />
            </div>
          </div>
          <div className="form-group row">
            {/* <label htmlFor="inputText" className="col-sm-2 col-form-label"></label> */}
            <div className="col-sm-10">
              <textarea className="form-control" id="inputText" placeholder="A moment in time...">
              </textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputUploads" className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <FileInput className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <button type="submit" className="btn btn-primary col">Sign in</button>
            </div>
          </div>
        </form>
        <hr/>
      </div>
    </main>

    <footer className="container">
      <p>&copy; Company 2021</p>
    </footer>
  </>);
};

export default MomentForm;
