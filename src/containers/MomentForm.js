import { observer } from 'mobx-react';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';

import AutoTextArea from '@components/AutoTextArea';
import { HeroBox, Subtitle } from '@components/Headings';
import { IconBtn, IconRow } from "@components/Icon";
import Image from '@components/Image';
import { ModalContentBox} from '@components/Boxes';
import FileBox from '@components/FileBox';
import TagSelector from '@components/TagSelector';
import Store from '@models/Store';
import { http, uploadAsset } from '@services/Backend';

const MomentForm = (props) => {
  const { moment = {}, close } = props;
  const [ files, setFiles ] = useState([]);
  const [ text, setText ] = useState(moment.text);
  const [ tags, setTags ] = useState(moment.tags?.map((e) => e.name) || []);
  const [ takenAt, setTakenAt ] = useState(moment.takenAt ? new Date(moment.takenAt) : new Date())
  const [ uploading, setUploading ] = useState(0);

  const toastId = useRef(null);

  useEffect(() => {
    const body = {
      render: `Uploading: ${files.length - uploading}/${files.length}`,
      type: toast.TYPE.INFO,
      autoClose: false,
    }

    if (!uploading) {
      body.render = `Succesfully uploaded ${files.length} items!`,
      body.type = toast.TYPE.SUCCESS;
      body.autoClose = 3000;
    }

    toast.update(toastId.current, body);
  }, [uploading])

  const handleSubmit = async () => {
    // Set the overlay to avoid double submissions
    setUploading(files.length);
    toastId.current = toast("Saving...", { autoClose: false });

    // Create the form data, and load the image uploads
    let newMoment = {
      text,
      tags,
      profile: Store.profile.id,
      takenAt,
    }

    if (moment._id) {
      // Send the request upstream.
      newMoment = await http.put(`/moments/${moment._id}`, newMoment)
        .then((response) => {
          toast(
            `Updated this moment for ${Store.profile.nickname}!`,
            {
              type: toast.TYPE.SUCCESS,
              autoClose: 3000,
            }
          );
          return response.data;
        });

    } else {
      // Send the request upstream.
      newMoment = await http.post("/moments", newMoment)
        .then((response) => {
          toast(
            `Created a new moment for ${Store.profile.nickname}!`,
            {
              type: toast.TYPE.SUCCESS,
              autoClose: 3000,
            }
          );
          return response.data;
        });
    }

    files.forEach((entry) => {
      uploadAsset(entry.file, tags, Store.profile.id, newMoment._id)
        .catch((e) => e)
        .then(() => {
          setUploading(prev => prev - 1)
        });
    })
  }

  return (
    <ModalContentBox className="flex-box flex-column gap-1">
      <IconRow>
        <IconBtn className="la la-save" onClick={handleSubmit} primary/>
        <IconBtn className="la la-times" onClick={close} danger/>
      </IconRow>

      <HeroBox>
        <Subtitle>Add to the memories of {Store.profile.nickname}</Subtitle>
      </HeroBox>

      <AutoTextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What adventures I had!"
        required
      />

      <FileBox onChange={setFiles} />

      <TagSelector tags={tags} setTags={setTags} />

      <DateTimePicker
        disableClock={true}
        onChange={setTakenAt}
        value={takenAt}
      />

      <div className="masonry">
        {
          moment.assets?.map((asset, index) => {
            return (
              <div key={`asset-${index}`} className={`masonry-brick`}>
                <Image src={asset.name} className='masonry-img scale-img' size='small' />
              </div>
            );
          })
        }
      </div>
    </ModalContentBox>
  );
};

export default observer(MomentForm);
