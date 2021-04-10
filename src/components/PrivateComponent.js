import { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PrivateComponent extends Component {

  render() {
    const { redirect = '/' } = this.props;
    if (!this.props.isAllowed) {
      return (<Redirect to={redirect} />)
    }

    return (this.props.children);
  }
}

export default PrivateComponent;