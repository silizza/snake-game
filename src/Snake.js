import React from 'react';

export default function Snake({fractions}) {    

  const snake = fractions.map(fraction => (
    <div 
      className="snake-fraction"
      key={`${fraction[0]}${fraction[1]}`}
      style={{
        left: `${fraction[0]}%`,
        top: `${fraction[1]}%`,
        background: (fraction[0] == 101) && 'white'
      }}></div>)
  )

  return (
    <div>
      {snake}
    </div>
  )
}