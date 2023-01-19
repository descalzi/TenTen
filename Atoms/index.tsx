import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { SquareDataType, COL_BASE, ROW_COL_BASE } from "../const"

export const activeRowAtom = atom<number>(0)
export const activeColAtom = atom<number>(0)
export const activeSquaresAtom = atom<number>(0)
export const rowLockAtom = atom<boolean>(false)
export const colLockAtom = atom<boolean>(false)
// button trackers
export const pressTrackerAtom = atom<SquareDataType[]>([])
export const disableTrackerAtom = atom<SquareDataType[]>([])
export const allSquaresAtom = atom<SquareDataType[]>([])
// score
export const sessionScoreAtom = atom<number>(0)
export const displayScoreAtom = atom<number>(0)
export const highScoreAtom = atomWithStorage<number>("highScore", 0)
