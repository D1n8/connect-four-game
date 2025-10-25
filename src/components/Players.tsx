interface PlayersProps {
  playerName1: string;
  playerName2: string;
  setPlayerName1: React.Dispatch<React.SetStateAction<string>>;
  setPlayerName2: React.Dispatch<React.SetStateAction<string>>;
}

function Players({playerName1, playerName2, setPlayerName1, setPlayerName2}: PlayersProps) {
    return(
        <div className="players-container">
                <div className="player">
                    <span>Игрок 1</span>
                    <input className="input-name" type="text" value={playerName1} onChange={(e) => setPlayerName1(e.target.value)} />
                </div>
                <div className="player">
                    <span>Игрок 2</span>
                    <input className="input-name" type="text" value={playerName2} onChange={(e) => setPlayerName2(e.target.value)} />
                </div>
            </div>
    );
}

export default Players;