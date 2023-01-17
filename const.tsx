export const PLAYAREA_COLS = 10
export const PLAYAREA_ROWS = 10
export const COL_BASE: boolean[] = Array.from(Array(PLAYAREA_COLS)).map(() => false)
export const ROW_COL_BASE: boolean[][] = Array.from(Array(PLAYAREA_ROWS)).map(()=> COL_BASE)

export type SquareDataType = {
    row: number,
    col: number,
    value: number
  }