import React from "react"
import { View, Pressable } from "react-native"
import { useStyleSheet, Button } from "@ui-kitten/components"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import {
    allSquaresAtom,
    displayScoreAtom,
    disableTrackerAtom,
    sessionScoreAtom,
    pressTrackerAtom,
    highScoreAtom,
} from "../Atoms"
import { playAreaStyles } from "../styles"
import { SquareDataType, PLAYAREA_COLS, PLAYAREA_ROWS } from "../const"
import ConfettiCannon from "react-native-confetti-cannon"

interface SingleSquareProps {
    data: SquareDataType
}
const SingleSquare = (props: SingleSquareProps) => {
    const styles = useStyleSheet(playAreaStyles)
    const [isActive, setIsActive] = React.useState<boolean>(false)
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
    const [pressTracker, setPressTracker] = useAtom(pressTrackerAtom)
    const [disableTracker, setDisableTracker] = useAtom(disableTrackerAtom)
    const [sessionScore, setSessionScore] = useAtom(sessionScoreAtom)
    const [displayScore, setDisplayScore] = useAtom(displayScoreAtom)
    const [highScore, setHighScore] = useAtom(highScoreAtom)

    React.useEffect(() => {
        setIsActive(pressTracker.includes(props.data))
        setIsDisabled(disableTracker.includes(props.data))
    }, [pressTracker, props])

    const isPressAboveLimit = React.useCallback(
        (value: number) => {
            console.info("Score Check", sessionScore, value)
            if (sessionScore + value > 10) {
                console.log("Score would pass limit")
                return true
            }
            return false
        },
        [sessionScore]
    )

    const isPressFullScore = React.useCallback(
        (value: number) => {
            console.info("Score Check", sessionScore, value)
            if (sessionScore + value === 10) {
                console.log("Row/Col completed. Nice.")
                return true
            }
            return false
        },
        [sessionScore]
    )

    const addToTracker = React.useCallback(
        (data: SquareDataType) => {
            setPressTracker((prev: SquareDataType[]) => {
                const newTracker = [...prev].concat(data)
                return newTracker
            })
        },
        [setPressTracker, pressTracker, setSessionScore, sessionScore]
    )

    const delFromTracker = React.useCallback(
        (data: SquareDataType) => {
            setSessionScore((prev: number) => prev - data.value)
            setPressTracker((prev: SquareDataType[]) => {
                const newTracker = [...prev]
                const index = newTracker.indexOf(data)
                newTracker.splice(index, 1)
                return newTracker
            })
        },
        [setSessionScore, setPressTracker]
    )

    const increaseScore = React.useCallback(
        (addScore: number) => {
            setSessionScore((prev: number) => prev + addScore)
        },
        [setSessionScore]
    )

    const resetScore = React.useCallback(() => {
        setSessionScore(0)
    }, [setSessionScore])

    const increaseDisplayScore = React.useCallback(
        (addScore: number) => {
            setDisplayScore((prev: number) => prev + addScore)
            if (displayScore + addScore > highScore) setHighScore(displayScore + addScore)
        },
        [setDisplayScore, displayScore, highScore, setHighScore]
    )

    const checkAndAction = React.useCallback(
        (data: SquareDataType) => {
            if (isPressAboveLimit(data.value)) return
            if (isPressFullScore(data.value)) {
                console.log("disable buttons, update display score, clean pressTracker")
                // disable buttons, clean tracker
                const squaresDone = [...pressTracker].concat(data)
                setDisableTracker((prev: SquareDataType[]) => prev.concat(squaresDone))
                setPressTracker([])
                // Set display score
                increaseDisplayScore(sessionScore + data.value + squaresDone.length)
                resetScore()
                return
            }
            addToTracker(data)
            increaseScore(data.value)
        },
        [
            isPressAboveLimit,
            isPressFullScore,
            increaseScore,
            addToTracker,
            resetScore,
            pressTracker,
            sessionScore,
        ]
    )

    const handlePress = React.useCallback(
        (data: SquareDataType) => {
            console.log(
                "Square Pressed:",
                data.value,
                "coords:",
                data.row,
                data.col,
                pressTracker.length
            )
            // De-Selection
            if (pressTracker.includes(data)) {
                console.log("Removing square")
                delFromTracker(data)
                return
            }
            // No selections
            if (!pressTracker.length) {
                console.log("Adding square")
                checkAndAction(data)
                return
            }
            // 1 square, can add col or row
            if (pressTracker.length === 1) {
                console.log("Adding square row/col allowed")
                if (pressTracker[0].row === data.row || pressTracker[0].col === data.col) {
                    checkAndAction(data)
                }
                return
            }
            console.log("Adding square only row or col allowed")
            if (pressTracker[0].row === pressTracker[1].row && pressTracker[1].row === data.row) {
                checkAndAction(data)
                return
            }
            if (pressTracker[0].col === pressTracker[1].col && pressTracker[1].col === data.col) {
                checkAndAction(data)
                return
            }
        },
        [pressTracker, setPressTracker]
    )

    return (
        <Pressable
            style={[
                styles.square_base,
                isActive
                    ? styles.square_pressed
                    : isDisabled
                    ? styles.square_disabled
                    : styles.square_unpressed,
            ]}
            onPress={() => !isDisabled && handlePress(props.data)}
        >
            {props.data.value}
        </Pressable>
    )
}

interface SquareRowProps {
    row: number
}
const SquareRow = (props: SquareRowProps) => {
    const setAllSquares = useSetAtom(allSquaresAtom)

    let allSquares: SquareDataType[] = []

    Array.from(Array(PLAYAREA_COLS).keys()).forEach((index: number) => {
        const squareValue: number = Math.floor(Math.random() * 10) || 1
        const squareData: SquareDataType = {
            row: props.row,
            col: index + 1,
            value: squareValue,
        }
        allSquares.push(squareData)
    })

    setAllSquares(allSquares)

    return (
        <View style={playAreaStyles.row}>
            <>
                {allSquares.map((squareData: SquareDataType, index: number) => {
                    return <SingleSquare key={index} data={squareData} />
                })}
            </>
        </View>
    )
}

const AllSquares = () => {
    const AllRowsAndCols = React.useMemo(() => {
        return (
            <>
                {Array.from(Array(PLAYAREA_ROWS).keys()).map((index: number) => {
                    return <SquareRow key={`row-${index}`} row={index + 1} />
                })}
            </>
        )
    }, [])

    return <View style={playAreaStyles.column}>{AllRowsAndCols}</View>
}

export const PlayArea = () => {
    const disableTracker = useAtomValue(disableTrackerAtom)
    const [completedRow, setCompletedRow] = React.useState<number[]>([])
    const [completedCol, setCompletedCol] = React.useState<number[]>([])

    const confettiRef = React.useRef()

    React.useEffect(() => {
        if (!completedCol.length && !completedRow.length) return
        if (!confettiRef.current) return
        confettiRef.current.start()
    }, [completedCol, completedRow, confettiRef])

    React.useEffect(() => {
        Array.from(Array(10).keys()).forEach((position: number) => {
            if (
                disableTracker.filter((square: SquareDataType) => square.row === position + 1)
                    .length === 10 &&
                !completedRow.includes(position + 1)
            ) {
                setCompletedRow((prev: number[]) => prev.concat(position + 1))
            }
            if (
                disableTracker.filter((square: SquareDataType) => square.col === position + 1)
                    .length === 10 &&
                !completedRow.includes(position + 1)
            ) {
                setCompletedRow((prev: number[]) => prev.concat(position + 1))
            }
        })
    }, [disableTracker])

    return (
        <View style={playAreaStyles.subcontainer}>
            <AllSquares />
            <ConfettiCannon
                count={200}
                origin={{ x: -20, y: 0 }}
                autoStart={false}
                fadeOut={true}
                ref={confettiRef}
            />
        </View>
    )
}
