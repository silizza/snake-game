import React from 'react';

export default function Food(props) {

  const x = props.coords[0];
  const y = props.coords[1];
  
  return(
    <div className="food" style={{
      left: `${x}%`,
      top: `${y}%`
    }}></div>
  )
}