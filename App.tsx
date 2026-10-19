import React from "react"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry, Divider, Layout } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { SafeAreaView } from "react-native"
import { TopBar } from "./TopBar"
import { PlayArea } from "./PlayArea"
import { ThemeContext } from "./theme-context"
import { playAreaStyles } from "./styles"

const HomeScreen = () => {
    const blah = 1

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopBar />
            <Divider />
            <Layout style={playAreaStyles.container} level="1">
                <PlayArea />
            </Layout>
        </SafeAreaView>
    )
}

export default () => {
    const [theme, setTheme] = React.useState("light")

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light"
        setTheme(nextTheme)
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <HomeScreen />
                </ApplicationProvider>
            </ThemeContext.Provider>
        </>
    )
}
