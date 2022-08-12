import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export interface IBatch {
    id: string
    name: string
    controllerTemperature: number
    createdDate: string
}

export interface IBatchDetailed {
    id: string
    name: string
    controllerTemperature: number
    createdDate: string
    temperatureData: ITemperature[]
    active: boolean;
    numberOfRestarts: number;
}

export interface ITemperature {
    date: string
    id: string
    temperature: number
}

export const useGetBatches = () => {
    return useQuery<IBatch[]>(["batches"], () => fetch("/api/batch").then(r => r.json()))
}

export const useGetBatch = (batchId: string) => {
    return useQuery<IBatchDetailed>(["batch", batchId], () =>
        fetch(`/api/batch/${batchId}`).then(r => r.json()), {refetchInterval: 10000})
}

export const usePostBatchNotActive = (batchId: string) => {
    const queryClient = useQueryClient();
    return useMutation<IBatchDetailed>(["batch", batchId], () =>
        fetch(`/api/batch/${batchId}/notactive`, {method: "POST"}).then(r => r.json()), {
        onSuccess: (data) => {
            queryClient.setQueriesData(["batch", batchId], () => data)
        }
    })
}

export const useGetDatabaseSize = () => {
    return useQuery<string>(["databasesize"], () => fetch("/api/batch/databasesize").then(r => r.text()))
}
