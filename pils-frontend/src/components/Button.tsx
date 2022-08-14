import {Text} from "./Text";

type ButtonProps = {
    onClick: () => void
    children: string
    className?: string
};
export const Button = ({onClick, children, className}: ButtonProps) => {
    return <button onClick={onClick}
                   className={`border border-black rounded p-1 px-2 w-[130px] shadow-md bg-amber-50 hover:shadow-lg hover:bg-amber-100 focus:ring-4 focus:outline-none focus:ring-blue-200 ${className}`}>
        <Text variant="h4" className="font-medium">
            {children}
        </Text>
    </button>;
};