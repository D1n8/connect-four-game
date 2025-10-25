import type { IBoard } from "../modules";

function modalResult(boardProps: IBoard) {
    return (
        <>
            {
                (boardProps.winner && boardProps.board_state === 'win') && (
                    <div className="winner">
                        <span className="text">Победитель: {boardProps.winner.name}</span>
                    </div>
                )
            }

            {
                (boardProps.board_state === 'draw') &&
                (
                    <div className="draw">
                        <span className="text text">Ничья</span>
                    </div>
                )
            }
        </>
    );

}

export default modalResult;