import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations"; //胜利条件
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  //错误的
  //如果直接对 initialGameBoard 进行修改,
  //当restart时，initialGameBoard数组不会重置，因为它已经被改变了
  //let gameBoard = initialGameBoard;

  //正确的
  // 对 initialGameBoard 进行一个深拷贝，deep copy
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  let winner;

  for (const turn of gameTurns) {
    //格式取决于App.jsx里的updateTurns的
    const { square, player } = turn;
    //格式取决于App.jsx里的updateTurns的 square
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    //获取格子里的符号
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    //判断胜利
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  //判断平局
  const hasDraw = gameTurns.length === 9 && !winner;

  //处理点击
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* 即使在这里同时使用了相同的组件，他们也是独立运行的，
          写在组件里的function就就只会在这一个里执行 */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
