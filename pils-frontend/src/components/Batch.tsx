import {IBatchDetailed, usePostBatchNotActive} from "../api/batch.api";
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
import {useState} from "react";

type BatchProps = {
    batch: IBatchDetailed
}

export const Batch = ({batch}: BatchProps) => {
    const {mutate} = usePostBatchNotActive(batch.id)
    const [batchName, setBatchName] = useState(batch.name)
    const [temp, setTemp] = useState(batch.controllerTemperature.toString())


    return <>
        <div className="flex items-start justify-between flex-wrap">
            <div>
                <Input label="Navn" placeholder="Hva skal pilsen din hete?" value={batchName} onChange={setBatchName}/>
                <Input type="number" label="Temperatur °C" placeholder="Hva skal pilsen din hete?" value={temp} onChange={setTemp}/>
            </div>
            <div>
                <Text variant="h2" as={"h2"} className="font-medium mb-1">Detaljer</Text>
                <Text><span className="font-medium">Antall målinger:</span> {batch.numberOfReadings}</Text>
                <Text><span className="font-medium">Antall restarter:</span> {batch.numberOfRestarts}</Text>
            </div>
            <Button onClick={() => mutate()}>{batch.active ? "Deaktiver" : "Aktiver"}</Button>
        </div>
    </>;
};
