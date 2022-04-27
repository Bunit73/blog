import * as React from 'react';
import { BaseFunctionComponent } from './BaseComponent';
import { Helpers } from './Helpers';

const TagBadge: BaseFunctionComponent<{
  text: string;
  style?: React.CSSProperties;
  className?: string;
}> = (props) => {
  return (
    <span
      className={`${props.className ? props.className : ''} badge rounded-pill text-capitalize`}
      style={{ backgroundColor: Helpers.colors.stringToColor(props.text + 'poop') }}>
      {props.text}
    </span>
  );
};

export { TagBadge };
