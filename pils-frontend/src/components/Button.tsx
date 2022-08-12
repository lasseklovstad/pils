type ButtonProps = {
    onClick: () => void
    children: string
};
export const Button = ({onClick, children}: ButtonProps) => {
    return <button onClick={onClick}
                   className={"border border-black rounded p-1 hover:bg-amber-100"}>{children}</button>;
};