import React from "react"
import { Modal, Layout } from "@ui-kitten/components"
import { playAreaStyles } from "./styles"

interface GameModalProps {
    visible: boolean
    onBackdropPress?: () => void
    children?: React.ReactNode
}

export const GameModal = (props: GameModalProps) => (
    <Modal
        visible={props.visible}
        animationType="slide"
        backdropStyle={playAreaStyles.backdrop}
        onBackdropPress={props.onBackdropPress}
    >
        <Layout style={{ padding: 24, borderRadius: 4 }}>{props.children}</Layout>
    </Modal>
)
