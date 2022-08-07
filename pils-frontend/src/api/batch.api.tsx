import {useQuery} from "@tanstack/react-query";

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
    return useQuery<IBatchDetailed>(["batch", batchId], () => fetch(`/api/batch/${batchId}`).then(r => r.json()))
}

export const useGetDatabaseSize = () => {
    return useQuery<string>(["databasesize"], () => fetch("/api/batch/databasesize").then(r => r.text()))
}
