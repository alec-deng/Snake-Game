import React from 'react';

const snake = (props) => {
  return (
    <div>
      {props.snake.map((square, key) => {
        const style = {
          left: `calc(${square[0]}*4vh)`,
          top: `calc(${square[1]}*4vh)`
        }
        return <div className='snake' key={key} style={style}/>
      })}
    </div>
  );
}

export default snake;
