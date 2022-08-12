import {IBatchDetailed, usePostBatchNotActive} from "../api/batch.api";
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    YAxis,
    BarChart,
    Bar
} from "recharts";
import {Button} from "./Button";

type BatchProps = {
    batch: IBatchDetailed
}

export const Batch = ({batch}: BatchProps) => {
    const data = batch.temperatureData.map(batch => ({
        temp: batch.temperature,
        date: batch.date
    })).filter(dataPoint => dataPoint.temp > -50 && dataPoint.temp < 80)
    const {mutate} = usePostBatchNotActive(batch.id)
    return <div>
        <div className="md:h-[600px] sm:h-[400px] p-2">
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
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
            <div>
                <div>Id: {batch.id}</div>
                <div>Navn: {batch.name}</div>
                <div>Kontroller temperatur: {batch.controllerTemperature} C</div>
                <div>Antall målinger: {batch.temperatureData.length}</div>
                <div>Antall restarter: {batch.numberOfRestarts}</div>
                <div>{batch.active ? "Batch er aktiv": "Batch er inaktiv"}</div>
                <Button onClick={() => mutate()}>Sett inaktive</Button>
            </div>
        </div>
    </div>;
};
