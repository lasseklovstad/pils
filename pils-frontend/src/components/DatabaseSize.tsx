import {useGetBatches, useGetDatabaseSize} from "../api/batch.api";
import {Spinner} from "./Spinner";

type DatabaseSizeProps = {}

export const DatabaseSize = (props: DatabaseSizeProps) => {
    const {isLoading, isError, isSuccess, data} = useGetDatabaseSize()

    if (isLoading) {
        return <Spinner />
    }

    if (isError || !isSuccess) {
        return <div>Noe gikk galt</div>
    }
    return <div>Brukt: {parseInt(data) / 10}%</div>;
};
