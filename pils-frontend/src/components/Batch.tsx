import {IBatchDetailed, useDeleteBatch, usePostBatchNotActive, usePutBatch} from "../api/batch.api";
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    CartesianGrid,
    Tooltip,
    Line,
    YAxis
} from "recharts";
import {Button} from "./Button";
import {Text} from "./Text";
import {Input} from "./Input";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type BatchProps = {
    batch: IBatchDetailed
}

export const Batch = ({batch}: BatchProps) => {
    const navigate = useNavigate()
    const {mutate} = usePostBatchNotActive(batch.id)
    const {mutate: mutateBatch} = usePutBatch(batch.id)
    const {mutate: deleteBatch} = useDeleteBatch(batch.id)
    const [batchName, setBatchName] = useState(batch.name)
    const [temp, setTemp] = useState(batch.controllerTemperature.toString())

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutateBatch({
            name: batchName,
            controllerTemperature: parseFloat(temp)
        })
    }

    return <>
        <div className="flex items-start justify-between flex-wrap">
            <form onSubmit={handleSubmit}>
                <Input label="Navn" placeholder="Hva skal pilsen din hete?" value={batchName} onChange={setBatchName}/>
                <Input type="number" label="Temperatur °C" placeholder="Hva skal pilsen din hete?" value={temp}
                       onChange={setTemp}/>
                <Button type="submit">Lagre</Button>
            </form>
            <div>
                <Text variant="h2" as={"h2"} className="font-medium mb-1">Detaljer</Text>
                <Text><span className="font-medium">Antall målinger:</span> {batch.numberOfReadings}</Text>
                <Text><span className="font-medium">Antall restarter:</span> {batch.numberOfRestarts}</Text>
            </div>
            <div className="flex flex-col">
                <Button onClick={() => mutate()} className="mb-2">{batch.active ? "Deaktiver" : "Aktiver"}</Button>
                <Button onClick={() => deleteBatch(undefined, {onSuccess: () => navigate("/")})}>Slett</Button>
            </div>
        </div>
    </>;
};
