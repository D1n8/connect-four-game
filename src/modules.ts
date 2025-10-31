
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
    board: IBoard,
    player1: Player,
    player2: Player,
    currentPlayer: Player | null,
    setPlayer1: React.Dispatch<React.SetStateAction<Player | null>>,
    setPlayer2: React.Dispatch<React.SetStateAction<Player | null>>,
    setBoard: React.Dispatch<React.SetStateAction<IBoard>>,
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>
}


export interface IResult {
    player_1: [number, number][],
    player_2: [number, number][],
    board_state: 'waiting' | 'pending' | 'win' | 'draw',
    winner?: {
        who: 'player_1' | 'player_2',
        positions: [number, number][]
    }
}

export interface IStepsHistory{
    [key: string]: IResult
}