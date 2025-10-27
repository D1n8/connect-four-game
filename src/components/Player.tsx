import type { Player } from "../modules";

interface PlayersProps {
    player: Player,
    text: string
}

function PlayerComponent({ player, text}: PlayersProps) {
    return (
        <div className="player">
            <span>{text}</span>
            <span>{player.name}</span>
            <span>{player.score}</span>
        </div>

    );
}

export default PlayerComponent;