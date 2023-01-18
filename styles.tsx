import { StyleService } from "@ui-kitten/components"

export const playAreaStyles = StyleService.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
    },
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    square_base: {
        width: "38px",
        height: "38px",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 5,
        margin: "1px",
    },
    square_unpressed: {
        borderColor: "color-primary-default",
        backgroundColor: "color-primary-transparent-100",
        color: "color-primary-default",
    },
    square_pressed: {
        borderColor: "color-success-default",
        backgroundColor: "color-success-transparent-100",
        color: "color-success-default",
    },
    square_disabled: {
        borderColor: "color-basic-disabled",
        backgroundColor: "color-basic-transparent-100",
        color: "color-basic-disabled",
        cursor: "default",
    },
})
