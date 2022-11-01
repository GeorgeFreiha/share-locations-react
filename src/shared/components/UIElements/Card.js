import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
    {/* stateful component */}
      {props.children} 
    </div>
  );
};

export default Card;
