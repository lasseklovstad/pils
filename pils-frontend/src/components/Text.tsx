import {ReactNode} from "react";

type TextProps = {
    variant?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2"
    as?: "h1" | "h2" | "h3"| "h4" | "div" | "span"
    className?: string
    children?: ReactNode
};

const textClasses = {
    h1 : "text-4xl",
    h2 : "text-2xl",
    h3 : "text-xl",
    h4 : "text-lg",
    body1 : "text-base",
    body2 : "text-sm",
}

export const Text = ({variant = "body1", as = "div", className, children}: TextProps) => {
    const Component = as;
    return <Component className={`${textClasses[variant]} text-black text-normal font-sans ${className}`}>{children}</Component>;
};