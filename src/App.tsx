import { useState } from 'react';
import './App.css'
import Board  from './components/Board'
import PlayerComponent from './components/Player';
import { Player } from './modules';

function App() {
  const rows = 6;
  const columns = 7;
  const [playerName1, setPlayerName1] = useState('Первый');
  const [playerName2, setPlayerName2] = useState('Второй');

  const [player1, setPlayer1] = useState(new Player('x', 'in_game', [], playerName1));
  const [player2, setPlayer2] = useState(new Player('o', 'in_game', [], playerName2));

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>ИГРА "4 В РЯД"</h1>
      </header>
      <main className="main">
        <PlayerComponent playerName={playerName1} setPlayerName={setPlayerName1} text='Игрок 1' />
        <Board rows={rows} columns={columns} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} playerName1={playerName1} playerName2={playerName2} />
        <PlayerComponent playerName={playerName2} setPlayerName={setPlayerName2} text='Игрок 2' />
      </main>
    </div>
  )
}

export default App
