import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components'

import Main from '@components/Main';
import PartialLoading from '@components/LoadingOverlay';
import Store from '@models/Store';
import { http } from '@services/Backend';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  & > * {
    flex-grow: 1;
  }
`;

const MomentForm = () => {
  const [ uploading, setUploading ] = useState(false);
  const [ weight, setWeight ] = useState(0);
  const [ temp, setTemp ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const [ head, setHead ] = useState(0);

  const handleClick = () => {
    // Set the overlay to avoid double submissions
    setUploading(true);

    // Create the form data, and load the image uploads
    const data = {
      weight,
      temp,
      height,
      head,
    }

    // Send the request upstream.
    return http.post("/vitals", data)
      .then(() => {
        // Faking a quick 2 second delay to give a sense of working
        // and reseting the state for more uploads.
        setTimeout(() => {
          setFiles({});
          setUploading(false);
        }, 2000);
      });
  }

  return (
    <Main>
      <Box>
        <h3>Add some vitals to {Store.profile.nickname}</h3>
        <div>
          <i class="las la-weight" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
          <span>Kg</span>
        </div>
        <div>
          <i class="las la-ruler-vertical" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
          <span>cm</span>
        </div>
        <div>
          <i class="las la-temperature-low" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Temperature" onChange={(e) => setTemp(e.target.value)} />
          <span>c</span>
        </div>
        <div>
          <i class="las la-user" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Head" onChange={(e) => setHead(e.target.value)} />
          <span>cm</span>
        </div>
        <button className="btn" onClick={handleClick}>Submit</button>
      </Box>
      <PartialLoading disabled={uploading} />
    </Main>
  );
};

export default observer(MomentForm);
