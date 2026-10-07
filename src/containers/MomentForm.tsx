import { observer } from 'mobx-react';
import { useState, useRef, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { toast, Id, UpdateOptions } from 'react-toastify';

import AutoTextArea from '@components/AutoTextArea';
import { HeroBox, Subtitle } from '@components/Headings';
import { IconBtn, IconRow } from "@components/Icon";
import Image from '@components/Image';
import { ModalContentBox} from '@components/Boxes';
import FileBox, { FileEntry } from '@components/FileBox';
import TagSelector from '@components/TagSelector';
import Store from '@models/Store';
import Http, { uploadAsset } from '@services/Http';
import { MomentResponse, TagOption } from '../types/api';

interface Props {
  moment?: Partial<MomentResponse>;
  close?: () => void;
}

const MomentForm = ({ moment = {}, close }: Props) => {
  const [ files, setFiles ] = useState<FileEntry[]>([]);
  const [ text, setText ] = useState<string>(moment.text ?? '');
  const [ tags, setTags ] = useState<TagOption[]>(moment.tags?.map((e) => ({ value: e.name })) || []);
  const [ takenAt, setTakenAt ] = useState<Date>(moment.takenAt ? new Date(moment.takenAt) : new Date())
  const [ uploading, setUploading ] = useState(0);

  const toastId = useRef<Id | null>(null);

  useEffect(() => {
    const body: UpdateOptions = {
      render: `Uploading: ${files.length - uploading}/${files.length}`,
      type: toast.TYPE.INFO,
      autoClose: false,
    }

    if (!uploading) {
      body.render = `Succesfully uploaded ${files.length} items!`;
      body.type = toast.TYPE.SUCCESS;
      body.autoClose = 3000;
    }

    if (toastId.current !== null) {
      toast.update(toastId.current, body);
    }
  }, [uploading])

  const handleSubmit = async () => {
    const profileId = Store.profile?.id;
    if (!profileId) {
      return;
    }

    close && close();
    // Set the overlay to avoid double submissions
    setUploading(files.length);
    toastId.current = toast("Saving...", { autoClose: false });

    // Create the form data, and load the image uploads. The server stores tag
    // names, so send the option values rather than the full option objects.
    const payload = {
      text,
      tags: tags.map((tag) => tag.value),
      profile: profileId,
      takenAt,
    }

    let saved: MomentResponse;
    if (moment._id) {
      // Send the request upstream.
      const response = await Http.put(`/moments/${moment._id}`, payload);
      toast(`Updated this moment for ${Store.profile?.nickname}!`, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });
      saved = response.data;
    } else {
      // Send the request upstream.
      const response = await Http.post("/moments", payload);
      toast(`Created a new moment for ${Store.profile?.nickname}!`, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });
      saved = response.data;
    }

    files.forEach((entry) => {
      uploadAsset(entry.file, tags, profileId, saved._id)
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
        <Subtitle>Add to the memories of {Store.profile?.nickname}</Subtitle>
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
