import {useGetBatches, usePostBatch} from "../api/batch.api";
import {Link, useNavigate} from "react-router-dom";
import {DatabaseSize} from "./DatabaseSize";
import {Button} from "./Button";
import {Spinner} from "./Spinner";

export const BatchList = () => {
    const {isLoading, isError, isSuccess, data} = useGetBatches()
    const mutation = usePostBatch()
    const navigate = useNavigate()

    if (isLoading) {
        return <Spinner />
    }

    if (isError || !isSuccess) {
        return <div>Noe gikk galt</div>
    }

    return <div>

        <div className="flex justify-between items-center">
            <h2 className="text-xl text-black font-medium">Batcher</h2>
            <DatabaseSize/>
            <Button onClick={() => {
                mutation.mutate(undefined, {onSuccess: (batch) => navigate(`/${batch.id}`)})
            }
            }>Ny batch</Button>
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
