interface PlayersProps {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>,
    text: string
}

function PlayerComponent({ playerName, setPlayerName, text }: PlayersProps) {
    return (
        <div className="player">
            <span>{text}</span>
            <input className="input-name" type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        </div>

    );
}

export default PlayerComponent;