import { useEffect, useState } from 'react';
import './App.css';
import './media.css';
import Board from './components/Board';
import PlayerComponent from './components/Player';
import { Player, type IBoard } from './modules';
import ModalEnterNames from './components/modalEnterNames';
import { createBoard } from './utils';

function App() {
  const rows = 6;
  const columns = 7;

  const [board, setBoard] = useState<IBoard | null>(null);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(player1);
  const [showNameModal, setShowNameModal] = useState(true);

  useEffect(() => {
    if (player1) localStorage.setItem('player_1', JSON.stringify(player1));
    if (player2) localStorage.setItem('player_2', JSON.stringify(player2));
    if (board) localStorage.setItem('board', JSON.stringify(board));
    if (currentPlayer) localStorage.setItem('current_player', currentPlayer.sym);
  }, [player1, player2, board, currentPlayer])

  useEffect(() => {
    try {
      const savedPlayer1 = localStorage.getItem('player_1');
      const savedPlayer2 = localStorage.getItem('player_2');
      const savedBoard = localStorage.getItem('board');
      const savedCurrent = localStorage.getItem('current_player');

      if (savedPlayer1 && savedPlayer2 && savedBoard) {
        const playerData1 = JSON.parse(savedPlayer1);
        const playerData2 = JSON.parse(savedPlayer2);
        const boardData = JSON.parse(savedBoard);

        if (playerData1 && playerData2 && boardData) {
          const newPlayer1 = new Player('x', playerData1.status || 'in_game', playerData1.chips || [], playerData1.name, playerData1.score || 0);
          const newPlayer2 = new Player('o', playerData2.status || 'in_game', playerData2.chips || [], playerData2.name, playerData2.score || 0);

          const restoredBoard: IBoard = {
            board_state: boardData.board_state || 'pending',
            winner: boardData.winner || null,
            board: boardData.board.map((row: (string | null)[]) => [...row])
          };

          setPlayer1(newPlayer1);
          setPlayer2(newPlayer2);
          setBoard(restoredBoard);
          setShowNameModal(false);

          if (savedCurrent === 'x') setCurrentPlayer(newPlayer1);
          else if (savedCurrent === 'o') setCurrentPlayer(newPlayer2);
        }
      } else {
        setShowNameModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  function handleStart(name1: string, name2: string) {
    const newPlayer1 = new Player('x', 'in_game', [], name1, 0);
    const newPlayer2 = new Player('o', 'in_game', [], name2, 0);

    setPlayer1(newPlayer1);
    setPlayer2(newPlayer2);
    setBoard({ board_state: 'pending', board: createBoard(rows, columns), winner: null });
    setCurrentPlayer(newPlayer1);
    setShowNameModal(false);
  }

  function handleNewGame() {
    setBoard({ board_state: 'waiting', board: createBoard(rows, columns), winner: null });
    setCurrentPlayer(null);
    setShowNameModal(true);
  }

  return (
    <div className='app'>
      <header className='header'>
        <div className="header-container">
          <h1 className='title'>ИГРА "4 В РЯД"</h1>
          <button onClick={handleNewGame} className="btn btn-header">Начать новую игру</button>
        </div>
      </header>

      {
        showNameModal && <ModalEnterNames onSubmit={handleStart} />
      }

      <main className="main">
        {
          (player1 && player2 && board) &&
          (
            <>
              <div className="players-container">
                <PlayerComponent text='Игрок 1' player={player1} isCurrent={currentPlayer === player1} />
                <PlayerComponent text='Игрок 2' player={player2} isCurrent={currentPlayer === player2} />
              </div>
              <Board board={board} rows={rows} currentPlayer={currentPlayer} columns={columns} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} setBoard={setBoard} setCurrentPlayer={setCurrentPlayer} />
            </>
          )
        }
      </main>
    </div>
  )
}

export default App
