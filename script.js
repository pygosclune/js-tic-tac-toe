// Gameboard module
const Gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => [...board];
  const markSpot = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true; // Spot marked successfully
    }
    return false; // Spot already taken
  };
  const resetBoard = () => {
    board.fill('');
  };

  return { getBoard, markSpot, resetBoard };
})();

// Player factory
const Player = (name, marker) => {
  return { name, marker };
};

// Display module
const DisplayController = (() => {
  const boardContainer = document.getElementById('board');
  const resultDisplay = document.getElementById('result');
  const restartButton = document.getElementById('restart-btn');
  let gameEnded = false;

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    boardContainer.innerHTML = '';
    board.forEach((marker, index) => {
      const square = document.createElement('div');
      square.classList.add('square');
      square.textContent = marker;
      square.addEventListener('click', () => makeMove(index));
      boardContainer.appendChild(square);
    });
  };

  const updateResult = (result) => {
    resultDisplay.textContent = result;
  };

  const makeMove = (index) => {
    if (!gameEnded && Gameboard.markSpot(index, currentPlayer.marker)) {
      renderBoard();
      if (checkWinner()) {
        updateResult(`${currentPlayer.name} (${currentPlayer.marker}) wins!`);
        gameEnded = true;
      } else if (Gameboard.getBoard().every((spot) => spot !== '')) {
        updateResult('It\'s a tie!');
        gameEnded = true;
      } else {
        switchPlayer();
      }
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
        Gameboard.getBoard()[a] !== '' &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[c]
      );
    });
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const restartGame = () => {
    gameEnded = false;
    Gameboard.resetBoard();
    renderBoard();
    updateResult('');
    currentPlayer = player1;
  };

  restartButton.addEventListener('click', restartGame);

  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  renderBoard(); // Initial rendering
})();
