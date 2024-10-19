import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let [board, setBoard] = useState(Array(9).fill("")); // Keep track of the board state

  const toggle = (index) => {
    if (lock || board[index] !== "") {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    data[index] = newBoard[index];
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        won(newBoard[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = winner === "x" ? `X Wins!` : `O Wins!`;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe with <span> REACT</span>`;
  };

  const renderIcon = (value) => {
    if (value === "x") {
      return <img src={cross_icon} alt="X" />;
    } else if (value === "o") {
      return <img src={circle_icon} alt="O" />;
    }
    return null;
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe with <span>REACT</span>
      </h1>
      <div className="board">
        <div className="row1">
          {[0, 1, 2].map((i) => (
            <div className="boxes" key={i} onClick={() => toggle(i)}>
              {renderIcon(board[i])}
            </div>
          ))}
        </div>
        <div className="row2">
          {[3, 4, 5].map((i) => (
            <div className="boxes" key={i} onClick={() => toggle(i)}>
              {renderIcon(board[i])}
            </div>
          ))}
        </div>
        <div className="row3">
          {[6, 7, 8].map((i) => (
            <div className="boxes" key={i} onClick={() => toggle(i)}>
              {renderIcon(board[i])}
            </div>
          ))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        RESET
      </button>
    </div>
  );
};
