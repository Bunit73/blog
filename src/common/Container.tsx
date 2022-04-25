import * as React from 'react';
import { BaseFunctionComponent } from './BaseComponent';
const Container: BaseFunctionComponent<{
  className?: string;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <div
      style={props.style ? props.style : {}}
      className={`container ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
};

export { Container };
