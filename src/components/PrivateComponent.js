import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateComponent = (props) => {
  const { redirect = '/' } = props;
  if (!props.isAllowed) {
    return (<Redirect to={redirect} />)
  }

  return (props.children);
}

export default PrivateComponent;