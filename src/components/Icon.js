import * as icons from '@mdi/js';
import {Icon as MdiIcon} from '@mdi/react';

const Icon = (props) => {

  return (
    <MdiIcon path={icons[props.path]} size={props.size || '1.5rem'} style={{verticalAlign: 'middle'}}/>
  )
}

export default Icon;
