import type { IBoard } from "../modules";

function modalResult(boardProps: IBoard) {
    return (
        <>
            {
                (boardProps.winner && boardProps.board_state === 'win') && (
                    <div className="result winner">
                        <span className="result-text text">Победитель: {boardProps.winner.name}</span>
                    </div>
                )
            }

            {
                (boardProps.board_state === 'draw') &&
                (
                    <div className="result draw">
                        <span className="text">Ничья</span>
                    </div>
                )
            }
        </>
    );

}

export default modalResult;