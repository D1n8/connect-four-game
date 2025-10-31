import { Player, type IResult, type IStepsHistory } from "./modules";

export function createBoard(rows: number, columns: number): ('x' | 'o' | null)[][] {
    return Array(rows).fill(null).map(() => Array(columns).fill(null))
}

function includesChipInChips(chip: [number, number], chipsArr: [number, number][]) {
    for (const item of chipsArr) {
        if (item[0] === chip[0] && item[1] === chip[1]) {
            return true;
        }
    }
    return false;
}

export function loadPlayerFromStorage(key: string, defaultName: string, sym: 'x' | 'o') {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            const parsed = JSON.parse(data);
            return new Player(sym, 'in_game', parsed.chips || [], parsed.name || defaultName, parsed.score || 0);
        } catch (e) {
            console.log(e)
        }
    }
    return new Player(sym, 'in_game', [], defaultName, 0);
}

// chip[0] - row, chip[1] - column
export function checkWin(chips: [number, number][]) {
    const winPosition: [number, number][] = [];
    for (const [r, c] of chips) {
        // поиск последовательности в ряд
        if (includesChipInChips([r, c + 1], chips) &&
            includesChipInChips([r, c + 2], chips) &&
            includesChipInChips([r, c + 3], chips)) {
            winPosition.push([r, c], [r, c + 1], [r, c + 2], [r, c + 3])
            return { isWin: true, winPosition: winPosition };
        }
        // поиск последовательности в колонну
        if (includesChipInChips([r + 1, c], chips) &&
            includesChipInChips([r + 2, c], chips) &&
            includesChipInChips([r + 3, c], chips)) {
            winPosition.push([r, c], [r + 1, c], [r + 2, c], [r + 3, c])
            return { isWin: true, winPosition: winPosition };
        }
        // поиск последовательности по диагоналям
        if (includesChipInChips([r + 1, c + 1], chips) &&
            includesChipInChips([r + 2, c + 2], chips) &&
            includesChipInChips([r + 3, c + 3], chips)) {
            winPosition.push([r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3])
            return { isWin: true, winPosition: winPosition };
        }

        if (includesChipInChips([r - 1, c + 1], chips) &&
            includesChipInChips([r - 2, c + 2], chips) &&
            includesChipInChips([r - 3, c + 3], chips)) {
            winPosition.push([r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3])
            return { isWin: true, winPosition: winPosition };
        }
    }
    return { isWin: false, winPosition: [] };
}

export function validator(sequenceOfSteps: number[]) {
    const board = createBoard(6, 7);
    const steps: IStepsHistory = {}
    const result: IResult = {
        player_1: [],
        player_2: [],
        board_state: 'waiting'
    };

    // 0 шаг - начало игры
    steps['step_0'] = { player_1: [], player_2: [], board_state: 'waiting' };

    if (sequenceOfSteps.length === 0) return steps

    for (let step = 0; step < sequenceOfSteps.length; step++) {
        result.board_state = 'pending';

        if (sequenceOfSteps[step] > 6 || sequenceOfSteps[step] < 0) {
            throw new Error("Задана неверная последовательность. Ширина доски от 0 до 6")
        }

        for (let i = 5; i >= 0; i--) {  
            if (board[i][sequenceOfSteps[step]] === null) {
                if (step % 2 == 0) {
                    board[i][sequenceOfSteps[step]] = 'x';
                    result.player_1.push([i, sequenceOfSteps[step]]);
                    const checkWinner = checkWin(result.player_1)
                    if (checkWinner.isWin) {
                        result.board_state = 'win';
                        result.winner = {
                            who: "player_1",
                            positions: checkWinner.winPosition
                        }
                    }
                } else {
                    board[i][sequenceOfSteps[step]] = 'o'
                    result.player_2.push([i, sequenceOfSteps[step]])
                    const checkWinner = checkWin(result.player_2)
                    if (checkWinner.isWin) {
                        result.board_state = 'win';
                        result.winner = {
                            who: "player_2",
                            positions: checkWinner.winPosition
                        }
                    }
                }
                const resultCopy: IResult = {
                    player_1: result.player_1.map((r) => [...r]),
                    player_2: result.player_2.map((r) => [...r]),
                    board_state: result.board_state,
                    ...(result.winner ? { winner: result.winner } : {})
                };
                steps[`step_${step + 1}`] = resultCopy;
                break
            } else {
                if (i == 0) {
                    throw new Error('Задана неверная последовательность. Макс кол-во фишек в столбце - 6')
                }
            }
        }

        if (result.winner) break
    }

    //ничья
    if (!result.winner && board.flat().filter(cell => cell !== null).length === (6 * 7)) {
        result.board_state = 'draw';
        const lastStepKey = `step_${Object.keys(steps).length - 1}`;
        steps[lastStepKey] = result;
    }

    return steps;
}
