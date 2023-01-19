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
import { useAtom } from "jotai"
import { displayScoreAtom } from "../Atoms"
import { View } from "react-native"

const ThemeIcon = (props: IconProps) => {
    const themeContext = React.useContext(ThemeContext)
    return <Icon {...props} name={themeContext.theme === "light" ? "sun" : "moon"} />
}

const AwardIcon = (props: IconProps) => {
    const themeContext = React.useContext(ThemeContext)
    return <Icon {...props} name="award" />
}

export const TopBar = () => {
    const themeContext = React.useContext(ThemeContext)
    const [displayScore, setDisplayScore] = useAtom(displayScoreAtom)

    const topLeftActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={AwardIcon} />
            <Text>`Score: ${displayScore}`</Text>
        </React.Fragment>
    )

    const topRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={ThemeIcon} onPress={themeContext.toggleTheme} />
        </React.Fragment>
    )

    return (
        <TopNavigation
            alignment="center"
            title="Ten-Ten"
            accessoryLeft={topLeftActions}
            accessoryRight={topRightActions}
        />
    )
}
