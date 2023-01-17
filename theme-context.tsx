import React from "react"
import * as eva from "@eva-design/eva"
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
  Text,
  Divider
} from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { SafeAreaView } from "react-native"
import { TopBar } from "./TopBar"
import { PlayArea } from "./PlayArea"

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
})
