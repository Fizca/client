import { Redirect } from 'react-router-dom';

interface Props {
  isAllowed?: unknown;
  redirect?: string;
  children?: React.ReactNode;
}

const PrivateComponent = (props: Props) => {
  const { redirect = '/' } = props;
  if (!props.isAllowed) {
    return (<Redirect to={redirect} />)
  }

  return (<>{props.children}</>);
}

export default PrivateComponent;
