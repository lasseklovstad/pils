import {Header} from "./components/Header";
import {BatchList} from "./components/BatchList";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Routes, Route} from "react-router-dom";
import {Batch} from "./components/Batch";
import {BatchPage} from "./components/BatchPage";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "./components/Button";
import {Text} from "./components/Text";

const queryClient = new QueryClient()

function App() {
    const {isAuthenticated, loginWithRedirect} = useAuth0()

    if(!isAuthenticated){
        return <div className="flex items-center justify-center h-[500px]">
            <div className="flex justify-center items-center flex-col p-2 h-[200px]">
                <Text variant="h2" as="h1" className="mb-2">Velkommen til Pils1!</Text>
                <Button onClick={() => loginWithRedirect()}>Logg inn</Button>
            </div>
        </div>
    }

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Header/>
                <main className="max-w-4xl mx-auto p-2">
                    <Routes>
                        <Route element={<BatchList/>} index/>
                        <Route element={<BatchPage />} path={":batchId"}/>
                    </Routes>
                </main>
            </QueryClientProvider>
        </div>
    )
}

export default App
