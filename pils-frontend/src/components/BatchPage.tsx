import {useParams} from "react-router-dom";
import {useGetBatch, useGetBatchTemperatures} from "../api/batch.api";
import {Batch} from "./Batch";
import {BatchTemperatureChart} from "./BatchTemperatureChart";
import {Text} from "./Text";
import {Spinner} from "./Spinner";

export const BatchPage = () => {
    const {batchId} = useParams()
    const getBatch = useGetBatch(batchId!)
    const getBatchTemperatures = useGetBatchTemperatures(batchId!)

    const renderBatch = ()=>{
        const {isLoading, isError, isSuccess, data} = getBatch
        if (isLoading) {
            return <Spinner text="Henter batch..." />
        }

        if (isError || !isSuccess) {
            return <Text>Noe gikk galt ved henting av batch</Text>
        }
        return <Batch batch={data}/>
    }

    const renderBatchTemperature = ()=>{
        const {isLoading, isError, isSuccess, data} = getBatchTemperatures
        if (isLoading) {
            return <Spinner text="Henter temperaturer.." />
        }

        if (isError || !isSuccess) {
            return <Text>Noe gikk galt ved henting av temperaturer</Text>
        }

        return <BatchTemperatureChart temperatures={data}/>
    }

    return <>
        {renderBatch()}
        {renderBatchTemperature()}
    </>
};
