import React, { Component } from 'react';

class App extends Component {

  render() {
    return (
      <div className="board">
        <div className="snake" style={{top:0, left:0}}></div>
        <div className="snake" style={{top:0, left:'2%'}}></div>
        <div className="snake" style={{top:0, left:'4%'}}></div>
      </div>
    );
  }
}

export default App;
