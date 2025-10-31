import { useEffect } from "react";
import { Player, type IBoardProps } from "../modules";
import { checkWin, createBoard } from "../utils";
import ModalResult from "./modalResult";
import Chip from "./Chip";


function Board({ board, rows, columns, currentPlayer, player1, player2, setPlayer1, setPlayer2, setBoard, setCurrentPlayer }: IBoardProps) {
    // коор. х - строки (0 <= x <= 5)
    // коор. y - стобцы (0 <= y <= 6)
    // board[x][y], x - макс индекс(низшая точки), y - выбранная колонка
    const countCells = rows * columns;


    useEffect(() => {
        const filledCells = board.board.flat().filter(cell => cell !== null).length; //кол-во заполненных клеток 
        if (board.board_state === 'pending' && filledCells === countCells) {
            setBoard({ ...board, board_state: 'draw' })
        }
    }, [board])

    useEffect(() => {
        if (player1.status === 'in_game' && checkWin(player1.chips).isWin) {
            setBoard({ ...board, board_state: 'win', winner: player1 })
            setPlayer1({ ...player1, status: 'winner', score: player1.score += 1 })
        }
    }, [player1]);

    useEffect(() => {
        if (player2.status === 'in_game' && checkWin(player2.chips).isWin) {
            setBoard({ ...board, board_state: 'win', winner: player2 })
            setPlayer2({ ...player2, status: 'winner', score: player2.score += 1 })
        }
    }, [player2]);

    function handleMove(columnIndex: number) {
        if (!currentPlayer) return;

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

    function startGame() {
        setPlayer1(new Player('x', 'in_game', [], player1.name, player1.score));
        setPlayer2(new Player('o', 'in_game', [], player2.name, player2.score));
        setBoard({ board_state: 'pending', board: createBoard(rows, columns), winner: null });
        setCurrentPlayer(player1);
    }

    return (
        <div className="board">
            <ModalResult {...board} />
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
                                    {
                                        column === 'x' && (
                                            <Chip color='red' />
                                        )
                                    }
                                    {
                                        column === 'o' && (
                                            <Chip color='blue' />
                                        )
                                    }

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
                <button onClick={() => startGame()} className="btn">Начать заново</button>
            }
        </div>
    );
}

export default Board;