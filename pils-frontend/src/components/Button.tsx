import {Text} from "./Text";
import {Spinner} from "./Spinner";

type ButtonProps = {
    onClick?: () => void
    type?: "submit" | "button"
    children: string
    className?: string
    loading?: boolean
};
export const Button = ({onClick, children, className, type= "button", loading = false}: ButtonProps) => {
    return <button onClick={onClick}
                   disabled={loading}
                   type={type}
                   className={`flex justify-center border border-black rounded p-1 px-2 w-[130px] shadow-md bg-amber-50 hover:shadow-lg hover:bg-amber-100 focus:ring-4 focus:outline-none focus:ring-blue-200 ${className}`}>
        {loading ? <Spinner /> : <Text variant="h4" className="font-medium">
            {children}
        </Text>}
    </button>;
};
