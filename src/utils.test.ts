import { describe, expect, it } from "vitest";
import { validator } from './utils'

describe('validator', () => {
  it('должен возвращать step_0 при пустом массиве', () => {
    const result = validator([])
    expect(result).toHaveProperty('step_0')
    expect(result.step_0.board_state).toBe('waiting')
    expect(result.step_0.player_1).toEqual([])
    expect(result.step_0.player_2).toEqual([])
  })

  it('должен корректно обработать один ход первого игрока', () => {
    const result = validator([3])
    const step1 = result.step_1
    expect(step1.player_1).toHaveLength(1)
    expect(step1.player_1[0]).toEqual([5, 3])
    expect(step1.board_state).toBe('pending')
  })

  it('должен вызывать ошибку при неверном номере колонки', () => {
    expect(() => validator([8])).toThrow(
      'Задана неверная последовательность. Ширина доски от 0 до 6'
    )
  })

  it('должен вызывать ошибку при переполнении колонки', () => {
    const moves = Array(7).fill(0)
    expect(() => validator(moves)).toThrow(
      'Задана неверная последовательность. Макс кол-во фишек в столбце - 6'
    )
  })

  it('должен определять победу первого игрока по горизонтали', () => {
    const moves = [0, 0, 1, 1, 2, 2, 3]
    const result = validator(moves)
    const lastStep = result[`step_${moves.length}`]

    expect(lastStep.board_state).toBe('win')
    expect(lastStep.winner?.who).toBe('player_1')
    expect(lastStep.winner?.positions).toHaveLength(4)
  })

  it('должен определять победу второго игрока по вертикали', () => {
    const moves = [0, 1, 2, 1, 3, 1, 4, 1]
    const result = validator(moves)
    const lastStep = result[`step_${moves.length}`]

    expect(lastStep.board_state).toBe('win')
    expect(lastStep.winner?.who).toBe('player_2')
    expect(lastStep.winner?.positions).toHaveLength(4)
  })

  it('должен определять ничью при заполнении всей доски', () => {
    const moves = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 6, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6];
    const result = validator(moves)
    const lastStep = result[`step_${moves.length}`]

    expect(lastStep.board_state).toBe('draw')
  })
})
