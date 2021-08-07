import React, { Component } from 'react';
import Snake from './snake';
import Food from './food';

const BoardSize = 20;

const randomCoordinate = () => {
  let x = Math.floor(Math.random() * BoardSize);
  let y = Math.floor(Math.random() * BoardSize);
  return [x,y];
}

class App extends Component {

  state = {
    food: randomCoordinate(),
    snake: [[0,0],[1,0]],
    point: 0,
    direction: 2, // 0:left, 1:up, 2:right, 3:down
    speed: 200,
    normalMode: false,
    wall: true,
    end: false
  }
/*
  randomCoordinate = () => {
    let x = Math.floor(Math.random() * BoardSize);
    let y = Math.floor(Math.random() * BoardSize);
    while ( this.unavaliableFood(x,y) === true ) {
      x = Math.floor(Math.random() * BoardSize);
      y = Math.floor(Math.random() * BoardSize);
    }
    return [x,y];
  }

  unavaliableFood = (x,y) => {
    let snake = this.state.snake;
    snake.forEach(body => {
      if (x === body[0] && y === body[1]) {
        return true;
      }
    });
    return false;
  }
*/
  checkEdges = () => {
    let head = this.state.snake[this.state.snake.length - 1];
    if ( head[0] >= 20 || head[0] < 0 || head[1] >= 20 || head[1] < 0 ) {
      if ( this.state.wall ) {
        this.setState({end: true});
      } else {
        
      }
    }
  }

  checkEatItself = () => {
    let snake = [...this.state.snake];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(body => {
      if ( (head[0] === body[0]) && (head[1] === body[1]) ) {
        this.setState({end: true});
      }
    })
  }

  checkEatFood = () => {
    let head = this.state.snake[this.state.snake.length - 1];
    let food = this.state.food;
    if ( head[0] === food[0] && head[1] === food[1] ) {
      this.setState({food: randomCoordinate()});
      this.snakeGrow();
      if ( this.state.normalMode ) {
        this.speedUp();
      }
    }
  }

  snakeGrow = () => {
    let snake = this.state.snake;
    snake.unshift([]);
    this.setState({
      snake: snake,
      point: this.state.point + 1
    });
  }

  speedUp = () => {
    if ( this.state.speed > 50 ) {
      this.setState({speed: this.state.speed - 10})
    }
  }

  componentDidMount = () => {
    setInterval(this.move, this.state.speed);
    document.onkeydown = this.keyPressed;
  }

  componentDidUpdate = () => {
    this.checkEdges();
    this.checkEatFood();
    this.checkEatItself();
  }

  shouldComponentUpdate = () => {
    if ( this.state.end ) {
      return false;
    } else {
      return true;
    }
  }

  keyPressed = (e) => {
    if ( e.keyCode >= 37 && e.keyCode <= 40) {
      if ( e.keyCode - 37 - this.state.direction !== 2 && e.keyCode - 37 - this.state.direction !== -2 ) {
        this.setState({direction: e.keyCode - 37});
      }
    }
  }

  move = () => {
    let snake = this.state.snake;
    let head = snake[snake.length - 1];
    let dir = this.state.direction;
    if ( dir === 0 ) {
      head = [head[0] - 1, head[1]];
    } else if ( dir === 1 ) {
      head = [head[0], head[1] - 1];
    } else if ( dir === 2 ) {
      head = [head[0] + 1, head[1]];
    } else if ( dir === 3 ) {
      head = [head[0], head[1] + 1];
    }
    snake.push(head);
    snake.shift();
    this.setState({snake: snake});
  }

  render() {
    return (
      <div className="board">
        <Snake snake={this.state.snake}/>
        <Food food={this.state.food}/>
      </div>
    );
  }
}

export default App;
