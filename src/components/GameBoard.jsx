export default function GameBoard({
  onSelectSquare,
  activePlayerSymbol,
  board,
}) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   //在格子上画OX的功能，读取行数列数判断再哪
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updateBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateBoard;
  //     });

  //     onSelectSquare(); //触发app.jsx里的选手状态
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* 点击画字 */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol ? true : false}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
