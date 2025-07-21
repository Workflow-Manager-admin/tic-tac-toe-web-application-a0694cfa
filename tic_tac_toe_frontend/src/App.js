import React, { useState, useCallback } from 'react';
import './App.css';
import { calculateWinner, isDraw } from './utils/gameLogic';

// PUBLIC_INTERFACE
const Square = ({ value, onClick, isWinner }) => {
  const className = `square ${value?.toLowerCase() || ''} ${isWinner ? 'winner' : ''} ${value ? 'pop' : ''}`;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const handleClick = useCallback((i) => {
    if (squares[i] || calculateWinner(squares)) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }, [squares, xIsNext]);

  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }, []);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  const gameIsDraw = !winner && isDraw(squares);

  let status;
  if (winner) {
    status = <span className="winner-message">Winner: {winner}</span>;
  } else if (gameIsDraw) {
    status = <span className="draw-message">Game is a draw!</span>;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <div className="game-info">{status}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            isWinner={winningLine.includes(i)}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
      <button className="restart-button" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
