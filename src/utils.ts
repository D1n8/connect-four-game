import type { Player } from "./modules";

function includesChipInChips(chip: [number, number], chipsArr: [number, number][]) {
    for (const item of chipsArr) {
        if (item[0] === chip[0] && item[1] === chip[1]) {
            return true;
        }
    }
    return false;
}
// chip[0] - row, chip[1] - column
export function checkWin(player: Player) {
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