import { IBatchDetailed} from "../api/batch.api";
import {ResponsiveContainer, LineChart, XAxis, CartesianGrid, Tooltip, Legend, Line, YAxis, BarChart, Bar} from "recharts";

type BatchProps = {
    batch: IBatchDetailed
}

export const Batch = ({batch}: BatchProps) => {
    const data = batch.temperatureData.map(batch=>({temp: batch.temperature, date: batch.date}))
    console.log(data)
    return <div >

        <div className="h-[600px] h-[600px] p-2">
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date: string) => {
                        const dateAsObject = new Date(date)
                        return `${dateAsObject.toLocaleDateString()} ${dateAsObject.toLocaleTimeString()}`
                    }} />
                    <YAxis allowDecimals domain={['dataMin', 'dataMax']}  />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#82ca9d" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <div>
                <div>Id: {batch.id}</div>
                <div>Navn: {batch.name}</div>
                <div>Kontroller temperatur: {batch.controllerTemperature} C</div>
                <div>Antall målinger: {batch.temperatureData.length}</div>
            </div>
        </div>
    </div>;
};
