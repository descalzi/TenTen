import React from "react"
import {
    TopNavigation,
    TopNavigationAction,
    Icon,
    Text,
    IconProps,
    Button,
} from "@ui-kitten/components"
import { Modal, ModalContent, SlideAnimation } from "react-native-modals"
import { View } from "react-native"
import { ThemeContext } from "../theme-context"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { displayScoreAtom, highScoreAtom, resetGameFlagAtom } from "../Atoms"

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

    const topRightActions = () => {
        const [showConfirmGameReset, setShowConfirmGameReset] = React.useState<boolean>(false)
        return (
            <React.Fragment>
                <TopNavigationAction icon={ThemeIcon} onPress={themeContext.toggleTheme} />
                <TopNavigationAction
                    icon={ReloadIcon}
                    onPress={() => setShowConfirmGameReset(true)}
                />
                <Modal
                    visible={showConfirmGameReset}
                    onTouchOutside={() => setShowConfirmGameReset(false)}
                    modalAnimation={
                        new SlideAnimation({
                            slideFrom: "bottom",
                        })
                    }
                >
                    <ModalContent>
                        <View
                            style={{
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    marginBottom: 20,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Text>Reset Game ?</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    style={{ margin: 2 }}
                                    onPress={() => setShowConfirmGameReset(false)}
                                >
                                    Nope
                                </Button>
                                <Button
                                    style={{ margin: 2 }}
                                    onPress={() => {
                                        setResetGameFlag(true)
                                        setShowConfirmGameReset(false)
                                    }}
                                >
                                    Yeah!
                                </Button>
                            </View>
                        </View>
                    </ModalContent>
                </Modal>
            </React.Fragment>
        )
    }

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
