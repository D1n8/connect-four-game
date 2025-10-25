import { useEffect, useState } from "react";

interface IPlayer {
    sym: 'x' | 'o',
    status: 'winner' | 'loser' | 'in_game',
    chips: [number, number][],
    name: string
}

interface IBoard {
    board_state: 'waiting' | 'pending' | 'win' | 'draw',
    board: ('x' | 'o' | null)[][],
    winner: IPlayer | null
}

class Player implements IPlayer {
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

function Board() {
    // коор. х - строки (0 <= x <= 5)
    // коор. y - стобцы (0 <= y <= 6)
    // board[x][y], x - макс индекс(низшая точки), y - выбранная колонка

    const rows = 6;
    const columns = 7;
    const countCells = rows * columns;
    const [player1Name, setPlayer1Name] = useState('Первый');
    const [player2Name, setPlayer2Name] = useState('Второй');

    const [player1, setPlayer1] = useState(new Player('x', 'in_game', [], player1Name));
    const [player2, setPlayer2] = useState(new Player('o', 'in_game', [], player2Name));
    const [currentPlayer, setCurrentPlayer] = useState<Player>(player1);

    const [board, setBoard] = useState<IBoard>({ board_state: 'waiting', board: createBoard(), winner: null });

    useEffect(() => {
        const filledCells = board.board.flat().filter(cell => cell !== null).length; //кол-во заполненных клеток 
        if (board.board_state === 'pending' && filledCells === countCells) {
            setBoard({ ...board, board_state: 'draw' })
        }
    }, [board])

    useEffect(() => {
        if (player1.status === 'in_game' && checkWin(player1)) {
            setBoard({ ...board, board_state: 'win', winner: player1 })
            setPlayer1({ ...player1, status: 'winner' })
        }
    }, [player1]);

    useEffect(() => {
        if (player2.status === 'in_game' && checkWin(player2)) {
            setBoard({ ...board, board_state: 'win', winner: player2 })
            setPlayer2({ ...player2, status: 'winner' })
        }
    }, [player2]);


    function createBoard(): ('x' | 'o' | null)[][] {
        return Array(rows).fill(null).map(() => Array(columns).fill(null))
    }

    function handleMove(columnIndex: number) {
        const newBoard = [...board.board];
        for (let i = 5; i >= 0; i--) {
            if (newBoard[i][columnIndex] === null) {
                newBoard[i][columnIndex] = currentPlayer.sym;

                // добавляю фишку игроку
                if (currentPlayer.sym === player1.sym) {
                    const updatedPlayer1: Player = { ...player1, chips: [...player1.chips, [i, columnIndex]] }
                    setPlayer1(updatedPlayer1);
                } else {
                    const updatedPlayer2: Player = { ...player2, chips: [...player2.chips, [i, columnIndex]] }
                    setPlayer2(updatedPlayer2);
                }

                setBoard({ ...board, board: newBoard });

                // смена хода
                setCurrentPlayer(currentPlayer.sym === player1.sym ? player2 : player1);
                break
            }
        }
    }

    function includesChipInChips(chip: [number, number], chipsArr: [number, number][]) {
        for (const item of chipsArr) {
            if (item[0] === chip[0] && item[1] === chip[1]) {
                return true;
            }
        }
        return false;
    }

    // chip[0] - row, chip[1] - column
    function checkWin(player: Player) {
        const winPosition = [];
        const chips = player.chips;
        for (const [r, c] of chips) {
            // поиск последовательности в ряд
            if (includesChipInChips([r, c + 1], chips) &&
                includesChipInChips([r, c + 2], chips) &&
                includesChipInChips([r, c + 3], chips)) {
                winPosition.push([r, c], [r, c + 1], [r, c + 2], [r, c + 3])
                console.log(winPosition)
                return true;
            }
            // поиск последовательности в колонну
            if (includesChipInChips([r + 1, c], chips) &&
                includesChipInChips([r + 2, c], chips) &&
                includesChipInChips([r + 3, c], chips)) {
                winPosition.push([r, c], [r + 1, c], [r + 2, c], [r + 3, c])
                console.log(winPosition)
                return true;
            }
            // поиск последовательности по диагоналям
            if (includesChipInChips([r + 1, c + 1], chips) &&
                includesChipInChips([r + 2, c + 2], chips) &&
                includesChipInChips([r + 3, c + 3], chips)) {
                winPosition.push([r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3])
                console.log(winPosition)
                return true;
            }

            if (includesChipInChips([r - 1, c + 1], chips) &&
                includesChipInChips([r - 2, c + 2], chips) &&
                includesChipInChips([r - 3, c + 3], chips)) {
                winPosition.push([r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3])
                console.log(winPosition)
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        setPlayer1(new Player('x', 'in_game', [], player1Name));
        setPlayer2(new Player('o', 'in_game', [], player2Name));
        setBoard({ board_state: 'pending', board: createBoard(), winner: null });
        setCurrentPlayer(player1);
    }

    function startGame() {
        setPlayer1(new Player('x', 'in_game', [], player1Name));
        setPlayer2(new Player('o', 'in_game', [], player2Name));
        setBoard({ board_state: 'pending', board: createBoard(), winner: null });
        setCurrentPlayer(player1);
    }

    return (
        <div className="board">


            <div className="players-container">
                <div className="player">
                    <span>Игрок 1</span>
                    <input type="text" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} />
                </div>
                <div className="player">
                    <span>Игрок 2</span>
                    <input type="text" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} />
                </div>
            </div>

            {
                (board.winner && board.board_state === 'win') && (
                    <h2 className="text winner-text">Победитель: {board.winner.name}</h2>
                )
            }

            {
                (board.board_state === 'draw') &&
                <h2 className="text draw-text">Ничья</h2>
            }

            <div className="board-container">

                {
                    (board.board_state !== 'waiting') &&
                    board.board.map((row) => (
                        <div className="board-row">{
                            row.map((column, columnIndex) => (
                                <div onClick={() => {
                                    if (board.board_state === 'pending')
                                        handleMove(columnIndex)
                                }
                                } className="board-cell">
                                    <div>{column}</div>
                                </div>
                            ))
                        }
                        </div>
                    ))
                }
            </div>
            {
                board.board_state === 'waiting' &&
                <button onClick={() => startGame()} className="btn">Начать игру</button>
            }
            {
                board.board_state !== "waiting" &&
                <button onClick={() => resetGame()} className="btn">Начать заново</button>
            }
        </div>
    );
}

export default Board;