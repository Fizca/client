import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker';

import Main from '@components/Main';
import Loading from '@components/Loading';
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

const MomentForm = (props) => {
  const { vitals = {} } = props;
  const [ uploading, setUploading ] = useState(false);
  const [ weight, setWeight ] = useState(vitals.weight);
  const [ temp, setTemp ] = useState(vitals.temp);
  const [ height, setHeight ] = useState(vitals.height);
  const [ head, setHead ] = useState(vitals.head);
  const [ takenAt, setTakenAt ] = useState(vitals.takenAt || new Date())
  const [ id, setId ] = useState(vitals.id);

  const handleClick = () => {
    // Set the overlay to avoid double submissions
    setUploading(true);

    // Create the form data, and load the image uploads
    const data = {
      weight,
      temp,
      height,
      head,
      takenAt,
    }

    // Send the request upstream.
    return http.post("/vitals", data)
      .then((res) => {
        // Faking a quick 2 second delay to give a sense of working
        // and reseting the state for more uploads.
        console.log(res);
        setId(res.id)
        setTimeout(() => {
          setUploading(false);
        }, 2000);
      });
  }

  return (
    <Main>
      <Box>
        <h3>Add some vitals to {Store.profile.nickname}</h3>
        <div>
          <i className="las la-weight" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
          <span>Kg</span>
        </div>
        <div>
          <i className="las la-ruler-vertical" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
          <span>cm</span>
        </div>
        <div>
          <i className="las la-temperature-low" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Temperature" onChange={(e) => setTemp(e.target.value)} />
          <span>c</span>
        </div>
        <div>
          <i className="las la-user" style={{fontSize: '1.5rem', verticalAlign: 'middle'}}></i>
          <input type="number" placeholder="Head" onChange={(e) => setHead(e.target.value)} />
          <span>cm</span>
        </div>
        <div>
          <DateTimePicker
            disableClock={true}
            onChange={setTakenAt}
            value={takenAt}
          />
        </div>
        <button className="btn" onClick={handleClick}>Submit { id } </button>
      </Box>
      <Loading isLoading={uploading} />
    </Main>
  );
};

export default observer(MomentForm);
