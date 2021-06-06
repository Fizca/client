import FileInput from '@components/FileInput';
import { HeroBox, Subtitle, HeroTitle } from '@components/Headings';
import Main from '@components/Main';
import Store from '@models/Store';

const Uploads = () => (
  <Main>
    <HeroBox>
      <div>Upload</div>
      <Subtitle>Add to {Store.profile.nickname}'s adventures</Subtitle>
    </HeroBox>

    <FileInput />
  </Main>
);

export default Uploads;
