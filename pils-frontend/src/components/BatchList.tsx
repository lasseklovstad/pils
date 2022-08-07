import {useGetBatches} from "../api/batch.api";
import {Link} from "react-router-dom";
import {DatabaseSize} from "./DatabaseSize";

export const BatchList = () => {
    const {isLoading, isError, isSuccess, data} = useGetBatches()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !isSuccess) {
        return <div>Noe gikk galt</div>
    }

    return <div>

        <div className="flex justify-between items-center">
            <h2 className="text-xl text-black font-medium">Batcher</h2>
            <DatabaseSize/>
        </div>
        {data.length > 0 && <ul className={"pt-1 pb-1 divide-y"}>
            {data.map(batch => {
                const createdDate = new Date(batch.createdDate)
                return <li key={batch.id} className="p-1">
                    <Link to={batch.id}>
                        <div className="font-normal">{batch.name}</div>
                        <div
                            className="font-light">{createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()}</div>
                    </Link>
                </li>
            })}
        </ul>}
        {data.length === 0 && <div>Ingen batcher enda!</div>}
    </div>;
};
