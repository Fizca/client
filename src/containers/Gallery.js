import React from 'react';
import styled from 'styled-components';

import Link from '@components/Link';
import Photo from '@components/Photo';
import Navigation from '@containers/Navigation';

const Title = styled.h1`
  color: #1F2833;
  font-size: 400%;
`;

const Gallery = (props) => (
  <>
    <Navigation />
    <main role="main">

      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {
            [1,2,3,4,5,6,7,8].map((i) => {
              return (
                <div className="col-md-4" key={i + "row"} p={i+"row"}>
                  <div className="card mb-4 box-shadow">
                  <Photo className="card-img-top" src="2707f16843bff61726e269cb195bede8713764b52421f6d7111425c130a187c9.JPG"  style="height: 225px; width: 100%; display: block;" />
                    <div className="card-body">
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <hr/>

      </div>

    </main>

    <footer className="container">
      <p>&copy; Company 2021</p>
    </footer>
  </>
);

export default Gallery;
