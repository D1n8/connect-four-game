
export interface IPlayer {
    sym: 'x' | 'o',
    status: 'winner' | 'loser' | 'in_game',
    chips: [number, number][],
    name: string,
    score: number,
}

export interface IBoard {
    board_state: 'waiting' | 'pending' | 'win' | 'draw',
    board: ('x' | 'o' | null)[][],
    winner: IPlayer | null
}

export class Player implements IPlayer {
    sym: 'x' | 'o';
    status: 'winner' | 'loser' | 'in_game';
    chips: [number, number][];
    name: string;
    score: number;
    constructor(symPlayer: 'x' | 'o', status: 'winner' | 'loser' | 'in_game', chips: [number, number][], name: string, score: number) {
        this.sym = symPlayer
        this.status = status
        this.chips = chips
        this.name = name
        this.score = score
    }
}

export interface IBoardProps {
    rows: number,
    columns: number,
    player1: Player,
    player2: Player,
    setPlayer1: React.Dispatch<React.SetStateAction<Player | null>>,
    setPlayer2: React.Dispatch<React.SetStateAction<Player | null>>,
}