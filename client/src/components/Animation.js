import React from 'react';
import Marble from '../img/Marble.svg';

function Animation() {
  return (
    <object className="animate" type="image/svg+xml" data={Marble}>svg-animation</object>
  );
}
export default Animation;