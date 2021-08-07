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
  constructor() {
    super();
    this.state = {
      wall: false,
      playing: false,
      score: -1,
    }
  }

  playGame = () => {
    this.setState({playing: true});
  }
  endGame = (score) => {
    this.setState({playing: false, score: score});
  }

  switch = () => {
    this.setState({
      wall: this.state.wall ? false : true,
      
    });
  }

  render() {
    return (
        (this.state.playing) ?
        <Board wall={this.state.wall} end={this.endGame}/> : 
        <Interface wall={this.state.wall} play={this.playGame} score={this.state.score} switch={this.switch}/>
    );
  }
}


class Interface extends Component {

  render () {
    return (
      <div className="board">
      {(this.props.score === -1)? <></> : <p>Game Over! Your score is {this.props.score}.</p >}
          Game Mode:<button onClick={this.props.switch} style={{margin: '1vh'}}>{(this.props.wall)? "Edges On" : "Edges Off"}</button>
          <p className="description">When the edges are off, the snake won't die when it hits the edge of the board,
                                     instead, it will come out from the other side. When the edges
                                     are on, the snake will die if it tries to run out of the board.
                                     <br></br><br></br>
                                     (use arrow keys to control the snake) </p >
          <br/><br/><br/>
          <button onClick={this.props.play}>Play Game</button>      
      </div>
    );
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      food: randomCoordinate(),
      snake: [[0,0],[1,0]],
      direction: 2, // 0:left, 1:up, 2:right, 3:down
      speed: 130,  // simulating infinity
    }
  }

  componentDidMount = () => {
    window.interval = setInterval(this.move, this.state.speed);
    document.onkeydown = this.keyPressed;
  }

  componentDidUpdate = () => {
    this.checkEdges();
    this.checkEatFood();
    this.checkEatItself();
  }

  componentWillUnmount = () => {
    clearInterval(window.interval);
  }

  checkEdges = () => {
    if ( !(this.props.wall) ) {
      return;
    }
    let head = this.state.snake[this.state.snake.length - 1];
    if ( head[0] >= 20 || head[0] < 0 || head[1] >= 20 || head[1] < 0 ) {
      if ( this.props.wall ) {
        this.resetGame();
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
        this.resetGame();
      }
    })
  }

  checkEatFood = () => {
    let head = this.state.snake[this.state.snake.length - 1];
    let food = this.state.food;
    if ( head[0] === food[0] && head[1] === food[1] ) {
      this.setState({food: randomCoordinate()});
      this.snakeGrow();
    }
  }

  snakeGrow = () => {
    let snake = this.state.snake;
    snake.unshift([]);
    this.setState({
      snake: snake
    });
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
    if ( dir === 0 ) {                            // left
      if ( this.props.wall === false && head[0] === 0 ) {
        head = [19, head[1]];
      } else {
        head = [head[0] - 1, head[1]];
      }
    } else if ( dir === 1 ) {                     // up
      if ( this.props.wall === false && head[1] === 0 ) {
        head = [head[0], 19];
      } else {
        head = [head[0], head[1] - 1];
      }
    } else if ( dir === 2 ) {                     // right
      if ( this.props.wall === false && head[0] === 19 ) {
        head = [0, head[1]];
      } else {
        head = [head[0] + 1, head[1]];
      }
    } else if ( dir === 3 ) {                     // down
      if ( this.props.wall === false && head[1] === 19 ) {
        head = [head[0], 0];
      } else {
        head = [head[0], head[1] + 1];
      }
    }
    snake.push(head);
    snake.shift();
    this.setState({snake: snake});
  }

  resetGame = () => {
    alert(`Game Over! Your score is: ${this.state.snake.length - 2}`);
    this.props.end(this.state.snake.length - 2);
    this.setState({
      food: randomCoordinate(),
      snake: [[0,0],[1,0]],
      direction: 2, // 0:left, 1:up, 2:right, 3:down
    });
  }

  render () {
    return (
      <div className="board">
          <Snake snake={this.state.snake}/>
          <Food food={this.state.food}/>
      </div>
    );
  }

}

export default App;