import { useEffect, useState } from 'react';
import './App.css'
import Board from './components/Board'
import PlayerComponent from './components/Player';
import { Player } from './modules';
import ModalEnterNames from './components/modalEnterNames';

function App() {
  const rows = 6;
  const columns = 7;

  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [showNameModal, setShowNameModal] = useState(true);

  useEffect(() => {
    if (player1) localStorage.setItem('player_1', JSON.stringify(player1));
    if (player2) localStorage.setItem('player_2', JSON.stringify(player2));
  }, [player1, player2])

  useEffect(() => {
    try {
      const player1 = localStorage.getItem('player_1');
      const player2 = localStorage.getItem('player_2');

      if (player1 && player2) {
        const playerData1 = JSON.parse(player1);
        const playerData2 = JSON.parse(player2);

        if (playerData1 && playerData2 && playerData1.name && playerData2.name) {
          setPlayer1(new Player('x', 'in_game', [], playerData1.name, playerData1.score || 0));
          setPlayer2(new Player('o', 'in_game', [], playerData2.name, playerData2.score || 0));
          setShowNameModal(false);
        }

      } else {
        setShowNameModal(true);
      }
    } catch (e) {
      console.log(e)
    }

  }, []);

  function handleStart(name1: string, name2: string) {
    setPlayer1(new Player('x', 'in_game', [], name1, 0));
    setPlayer2(new Player('o', 'in_game', [], name2, 0));
    setShowNameModal(false);
  };

  function handleNewGame() {
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
          (player1 && player2) &&
          (
            <>
              <PlayerComponent text='Игрок 1' player={player1} />
              <Board rows={rows} columns={columns} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} />
              <PlayerComponent text='Игрок 2' player={player2} />
            </>
          )
        }

      </main>
    </div>
  )
}

export default App
