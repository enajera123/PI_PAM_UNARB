import { ReactNode } from "react"


type Options = {
    value: any,
    label: string
}

export type SelectProps = {
    label: string,
    placeholder: string,
    icon: ReactNode,
    options: Array<Options>, 
}