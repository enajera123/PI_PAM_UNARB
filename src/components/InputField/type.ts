import { ReactNode } from "react"

export type InputFieldProps = {
    label: string,
    placeholder: string,
    type?: string,
    iconStart?: ReactNode,
    iconEnd?: ReactNode
}