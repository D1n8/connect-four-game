import type { Player } from "../modules";

interface PlayersProps {
    player: Player,
    text: string,
    isCurrent: boolean
}

function PlayerComponent({ player, text, isCurrent }: PlayersProps) {
    return (
        <div className={`${player.sym === 'x' ? `player red` : 'player blue'} ${isCurrent ? 'current' : ''}`}>
            <span className="subtitle">{text}</span>
            <span className="name">{player.name}</span>
            <span className="score">Счет: {player.score}</span>
        </div>

    );
}

export default PlayerComponent;