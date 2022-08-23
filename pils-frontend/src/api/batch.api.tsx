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
    microControllerId: string | null
    batchType: string
}

export interface IBatchDetailed {
    id: string
    name: string
    controllerTemperature: number
    createdDate: string
    active: boolean;
    numberOfRestarts: number;
    numberOfReadings: number;
    microControllerId: string | null;
    batchType: "WARM" | "COLD"
}

export interface ITemperature {
    date: number
    temperature: number
}

export interface IMicroController {
    id: string
    name: string
}

export const useGetBatches = () => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }
    return useQuery<IBatch[]>(["batches"], startFetch)
}

export const useGetBatch = (batchId: string) => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }

    return useQuery<IBatchDetailed>(["batch", batchId], startFetch, {refetchInterval: 10000})
}

export const useGetControllers = () => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/controller`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }

    return useQuery<IMicroController[]>(["controller"], startFetch)
}

export const useGetBatchTemperatures = (batchId: string) => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}/temperature`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }

    return useQuery<ITemperature[]>(["batch-temperature", batchId], startFetch, {refetchInterval: 10000})
}

export const usePostBatchNotActive = (batchId: string) => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}/active`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`}
        }).then(r => r.json())
    }
    const queryClient = useQueryClient();
    return useMutation<IBatchDetailed>(["batch-active", batchId], startFetch, {
        onSuccess: (data) => {
            queryClient.setQueriesData(["batch", batchId], () => data)
        }
    })
}

export const usePutBatch = (batchId: string) => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async (body: IBatchUpdate) => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/${batchId}`, {
            body: JSON.stringify(body),
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`, "Content-type": "application/json"}
        }).then(r => r.json())
    }
    const queryClient = useQueryClient();
    return useMutation<IBatchDetailed, unknown, IBatchUpdate>(["batch-update", batchId], startFetch, {
        onSuccess: (data) => {
            queryClient.setQueriesData(["batch", batchId], () => data)
        }
    })
}

export const usePostBatch = () => {
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`, "Content-type": "application/json"}
        }).then(r => r.json())
    }
    return useMutation<IBatchDetailed>(["batch-create"], startFetch)
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
    const {getAccessTokenSilently} = useAuth0();

    const startFetch = async () => {
        const token = await getAccessTokenSilently();
        return fetch(`/api/batch/databasesize`, {headers: {"Authorization": `Bearer ${token}`}}).then(r => r.json())
    }
    return useQuery<string>(["databasesize"], startFetch)
}
