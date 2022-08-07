import {useParams} from "react-router-dom";
import {useGetBatch} from "../api/batch.api";
import {Batch} from "./Batch";

export const BatchPage = () => {
    const {batchId} = useParams()
    const {data, isLoading, isError, isSuccess} = useGetBatch(batchId!)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !isSuccess) {
        return <div>Noe gikk galt</div>
    }

    return <Batch batch={data}/>
};
