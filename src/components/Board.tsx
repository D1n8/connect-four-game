import { useState } from "react";


function Board() {
    // коор. х - строки (0 <= x <= 5)
    // коор. y - стобцы (0 <= y <= 6)
    // board[x][y], x - макс индекс(низшая точки), y - выбранная колонка
    const rows = 6;
    const columns = 7;
    const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>('x');

    const [board, setBoard] = useState(createBoard());

    function createBoard() {
        return Array(rows).fill(null).map(() => Array(columns).fill(null))
    }

    function handleMove(columnIndex: number) {
        const newBoard = [...board];
        for (let i = 5; i >= 0; i--) {
            if (newBoard[i][columnIndex] === null) {
                newBoard[i][columnIndex] = currentPlayer;
                setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
                setBoard(newBoard);
                break
            }
        }
    }

    function resetGame() {
        setBoard(createBoard())
    }

    return (
        <div className="board">
            <div className="board-container">
                {
                    board.map((row) => (
                        <div className="board-row">{
                            row.map((column, columnIndex) => (
                                <div onClick={() => handleMove(columnIndex)} className="board-cell">
                                    <div>{column}</div>
                                </div>
                            ))
                        }
                        </div>
                    ))
                }
            </div>
            <button onClick={() => resetGame()} className="btn">Начать заново</button>
        </div>
    );
}

export default Board;