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
import { displayScoreAtom, displayScorePrevAtom } from "../Atoms"
import AnimateNumber from "react-native-countup"

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
  const [displayScorePrev, setDisplayScorePrev] = useAtom(displayScorePrevAtom)

  // const ScoreCount = React.useMemo(() => {
  //   return <AnimateNumber initial={displayScorePrev} value={displayScore} timing="easeIn" countBy={1}/>
  // }, [displayScore])

  const topLeftActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={AwardIcon} />
      <Text>Score: </Text>
      <AnimateNumber initial={displayScorePrev} value={displayScore} timing="easeIn" countBy={1} />
    </React.Fragment>
  )

  const topRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={ThemeIcon} onPress={themeContext.toggleTheme} />
    </React.Fragment>
  )

  return (
    <Layout level="1">
      <TopNavigation
        alignment="center"
        title="Ten-Ten"
        accessoryLeft={topLeftActions}
        accessoryRight={topRightActions}
      />
    </Layout>
  )
}
