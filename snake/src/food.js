import React from 'react';

const food = (props) => {
  const style = {
    left: `calc(${props.food[0]}*4vh)`,
    top: `calc(${props.food[1]}*4vh)`
  }
  return <div className='food' style={style}/>
}

export default food;