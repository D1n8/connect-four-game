import type { IBoard } from "../modules";

interface IModalResultProps {
    boardProps: IBoard,
    startGame: () => void
}

function modalResult({ boardProps, startGame }: IModalResultProps) {
    return (
        <>
            {
                (boardProps.winner && boardProps.board_state === 'win') && (
                    <div className="modal-overlay">
                        <div className="result winner">
                            <div className="container">
                                <span className="result-text text">Победитель: {boardProps.winner.name}</span>
                            </div>
                            <button className="btn modal-result-btn" onClick={() => startGame()}>Начать заново</button>
                        </div>
                    </div>
                )
            }

            {
                (boardProps.board_state === 'draw') &&
                (
                    <div className="modal-overlay">
                        <div className="result draw">
                            <div className="result draw">
                            <div className="container">
                                <span className="result-text text">Ничья</span>
                            </div>
                            <button className="btn modal-result-btn" onClick={() => startGame()}>Начать заново</button>
                        </div>
                        </div>
                    </div>

                )
            }
        </>
    );

}

export default modalResult;