import {useAuth0} from "@auth0/auth0-react";
import {Button} from "./Button";
import {Text} from "./Text";
import {Link} from "react-router-dom";

export const Header = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0()
    return <header className={"bg-amber-100 shadow-md flex justify-center"}>
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto p-2">
            <Link to={""}>
                <Text variant="h1" className="mr-1" as="h1">Pils</Text>
            </Link>
            <div className="flex items-center">
                {isAuthenticated && <Text className="text-center mx-2">Logget inn som: {user?.name}</Text>}
                {isAuthenticated ? <Button onClick={() => logout()}>Logg ut</Button> :
                    <Button onClick={() => loginWithRedirect()}>Logg inn</Button>}
            </div>
        </div>
    </header>;
};
