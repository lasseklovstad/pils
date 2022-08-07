import {useGetBatches, useGetDatabaseSize} from "../api/batch.api";

type DatabaseSizeProps = {}

export const DatabaseSize = (props: DatabaseSizeProps) => {
    const {isLoading, isError, isSuccess, data} = useGetDatabaseSize()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !isSuccess) {
        return <div>Noe gikk galt</div>
    }
    return <div>Brukt: {parseInt(data) / 10}%</div>;
};
