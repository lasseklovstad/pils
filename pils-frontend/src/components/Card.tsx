import {ReactNode} from "react";

type CardProps = {
    children?: ReactNode
    className?: string
};
export const Card = ({children, className}: CardProps) => {
    return <div className={`rounded overflow-hidden shadow-lg p-4 ${className}`}>
        {children}
    </div>;
};