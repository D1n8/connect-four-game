
export interface IPlayer {
    sym: 'x' | 'o',
    status: 'winner' | 'loser' | 'in_game',
    chips: [number, number][],
    name: string
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
    constructor(symPlayer: 'x' | 'o', status: 'winner' | 'loser' | 'in_game', chips: [number, number][], name: string) {
        this.sym = symPlayer
        this.status = status
        this.chips = chips
        this.name = name
    }
}

export interface IBoardProps {
    rows: number,
    columns: number,
    player1: Player,
    player2: Player,
    setPlayer1: React.Dispatch<React.SetStateAction<Player>>,
    setPlayer2: React.Dispatch<React.SetStateAction<Player>>,
    playerName1: string,
    playerName2: string
}