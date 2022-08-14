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
    const data = batch.temperatureData.map(batch => ({
        temp: batch.temperature,
        date: batch.date
    })).filter(dataPoint => dataPoint.temp > -50 && dataPoint.temp < 80)
    const {mutate} = usePostBatchNotActive(batch.id)
    const [batchName, setBatchName] = useState(batch.name)
    const [temp, setTemp] = useState(batch.controllerTemperature.toString())


    return <div>

        <div className="flex items-start justify-between flex-wrap">
            <div>
                <Input label="Navn" placeholder="Hva skal pilsen din hete?" value={batchName} onChange={setBatchName}/>
                <Input type="number" label="Temperatur °C" placeholder="Hva skal pilsen din hete?" value={temp} onChange={setTemp}/>
            </div>
            <div>
                <Text variant="h2" as={"h2"} className="font-medium mb-1">Detaljer</Text>
                <Text><span className="font-medium">Antall målinger:</span> {batch.temperatureData.length}</Text>
                <Text><span className="font-medium">Antall restarter:</span> {batch.numberOfRestarts}</Text>
            </div>
            <Button onClick={() => mutate()}>{batch.active ? "Deaktiver" : "Aktiver"}</Button>
        </div>
        <div className="md:h-[600px] sm:h-[400px] p-2">
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tickFormatter={(date: string) => {
                        const dateAsObject = new Date(date)
                        return `${dateAsObject.toLocaleDateString()} ${dateAsObject.toLocaleTimeString()}`
                    }}/>
                    <YAxis allowDecimals domain={['dataMin', 'dataMax']}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="temp" stroke="#82ca9d" strokeWidth={3} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>;
};
