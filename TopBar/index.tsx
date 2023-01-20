import React from "react"
import {
    Layout,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Text,
    IconProps,
} from "@ui-kitten/components"
import { ThemeContext } from "../theme-context"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { displayScoreAtom, highScoreAtom, resetGameFlagAtom } from "../Atoms"
import { View } from "react-native"

const ThemeIcon = (props: IconProps) => {
    const themeContext = React.useContext(ThemeContext)
    return <Icon {...props} name={themeContext.theme === "light" ? "sun" : "moon"} />
}

const AwardIcon = (props: IconProps) => {
    const themeContext = React.useContext(ThemeContext)
    return <Icon {...props} name="award" />
}

const ReloadIcon = (props: IconProps) => {
    const themeContext = React.useContext(ThemeContext)
    return <Icon {...props} name="refresh" />
}

export const TopBar = () => {
    const themeContext = React.useContext(ThemeContext)
    const [displayScore, setDisplayScore] = useAtom(displayScoreAtom)
    const highScore = useAtomValue(highScoreAtom)
    const setResetGameFlag = useSetAtom(resetGameFlagAtom)

    const topLeftActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={AwardIcon} />
            <Text>Score: {displayScore}</Text>
        </React.Fragment>
    )

    const topRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={ThemeIcon} onPress={themeContext.toggleTheme} />
            <TopNavigationAction icon={ReloadIcon} onPress={() => setResetGameFlag(true)} />
        </React.Fragment>
    )

    return (
        <TopNavigation
            alignment="center"
            title="Ten-Ten"
            subtitle={`High-Score ${highScore}`}
            accessoryLeft={topLeftActions}
            accessoryRight={topRightActions}
        />
    )
}
