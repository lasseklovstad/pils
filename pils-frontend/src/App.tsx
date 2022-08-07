import {Header} from "./components/Header";
import {BatchList} from "./components/BatchList";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Routes, Route} from "react-router-dom";
import {Batch} from "./components/Batch";
import {BatchPage} from "./components/BatchPage";

const queryClient = new QueryClient()

function App() {

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Header/>
                <main className="m-2">
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
