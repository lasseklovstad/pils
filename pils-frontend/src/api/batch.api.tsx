import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";

export interface IBatch {
    id: string
    name: string
    controllerTemperature: number
    createdDate: string
}

export interface IBatchUpdate {
    name: string
    controllerTemperature: number
}

export interface IBatchDetailed {
    id: string
    name: string
    controllerTemperature: number
    createdDate: string
    active: boolean;
    numberOfRestarts: number;
    numberOfReadings: number;
}

export interface ITemperature {
    date: string
    id: string
    temperature: number
}

export const useGetBatches = () => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }
    return useQuery<IBatch[]>(["batches", isAuthenticated], startFetch)
}

export const useGetBatch = (batchId: string) => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }

    return useQuery<IBatchDetailed>(["batch", batchId, isAuthenticated], startFetch, {refetchInterval: 10000})
}

export const useGetBatchTemperatures = (batchId: string) => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}/temperature`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }

    return useQuery<ITemperature[]>(["batch-temperature", batchId, isAuthenticated], startFetch, {refetchInterval: 10000})
}

export const usePostBatchNotActive = (batchId: string) => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}/active`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`}
        }).then(r => r.json())
    }
    const queryClient = useQueryClient();
    return useMutation<IBatchDetailed>(["batch-active", batchId, isAuthenticated], startFetch, {
        onSuccess: (data) => {
            queryClient.setQueriesData(["batch", batchId, isAuthenticated], () => data)
        }
    })
}

export const usePutBatch = (batchId: string) => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async (body: IBatchUpdate) => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}`, {
            body: JSON.stringify(body),
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`, "Content-type": "application/json"}
        }).then(r => r.json())
    }
    const queryClient = useQueryClient();
    return useMutation<IBatchDetailed, unknown, IBatchUpdate>(["batch-update", batchId, isAuthenticated], startFetch, {
        onSuccess: (data) => {
            queryClient.setQueriesData(["batch", batchId, isAuthenticated], () => data)
        }
    })
}

export const useDeleteBatch = (batchId: string) => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
    return useMutation(startFetch)
}

export const useGetDatabaseSize = () => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/databasesize`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }
    return useQuery<string>(["databasesize", isAuthenticated], startFetch)
}
