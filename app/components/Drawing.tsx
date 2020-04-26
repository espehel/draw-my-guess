import React from 'react';
import CanvasDraw from "react-canvas-draw";

import { useIsMobileOrTablet } from '../utils/isMobileOrTablet';

const Drawing = () => {
  const isMobOrTab = useIsMobileOrTablet();


  return (<>
      <p>
      Use your {isMobOrTab ? "finger" : "mouse"} to draw{" "}
      <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>
      </p>

  <CanvasDraw
    style={{
      boxShadow:
        "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    }}
  />
  </>
)

};

export default Drawing;
