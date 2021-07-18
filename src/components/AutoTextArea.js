import React, { useState, useEffect, useRef } from "react";

const AutoTextArea = (props) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");
  const [fontSize, setFontSize] = useState("2rem");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);

    const charThreshold = 20 * 4;
    const size = event.target.value.length < charThreshold ? '2rem' : '1.25rem';
    setFontSize(size);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div style={{ height: parentHeight, maxHeight: '8rem', width: '100%' }}
    >
      <textarea
        {...props}
        ref={textAreaRef}
        rows={1}
        style={{ height: textAreaHeight, maxHeight: '8rem', fontSize }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default AutoTextArea;
