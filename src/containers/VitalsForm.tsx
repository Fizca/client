import { observer } from 'mobx-react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { ModalContentBox } from '@components/Boxes';
import { HeroBox, Subtitle, Title } from '@components/Headings';
import Store from '@models/Store';
import Http from '@services/Http';

interface Vitals {
  weight?: string;
  temp?: string;
  height?: string;
  head?: string;
  takenAt?: Date;
  id?: string;
}

interface Props {
  vitals?: Vitals;
}

const VitalsForm = ({ vitals = {} }: Props) => {
  const [ , setUploading ] = useState(false);
  const [ weight, setWeight ] = useState<string | undefined>(vitals.weight);
  const [ temp, setTemp ] = useState<string | undefined>(vitals.temp);
  const [ height, setHeight ] = useState<string | undefined>(vitals.height);
  const [ head, setHead ] = useState<string | undefined>(vitals.head);
  const [ takenAt, setTakenAt ] = useState<Date>(vitals.takenAt || new Date())
  const [ id, setId ] = useState<string | undefined>(vitals.id);

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
    return Http.post("/vitals", data)
      .then((res) => {
        // Faking a quick 2 second delay to give a sense of working
        // and reseting the state for more uploads.
        console.log(res);
        setId(res.data.id)
        setTimeout(() => {
          setUploading(false);
        }, 2000);
      });
  }

  return (
    <ModalContentBox className='flex-box flex-column gap-1'>
        <HeroBox>
          <Title>Vitals</Title>
          <Subtitle>How has {Store.profile?.nickname} grown?</Subtitle>
        </HeroBox>
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
    </ModalContentBox>
  );
};

export default observer(VitalsForm);
