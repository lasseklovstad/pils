import { IBatchDetailed} from "../api/batch.api";
import {ResponsiveContainer, LineChart, XAxis, CartesianGrid, Tooltip, Legend, Line, YAxis, BarChart, Bar} from "recharts";

type BatchProps = {
    batch: IBatchDetailed
}

const data1 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

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
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            <div>
                <div>Id: {batch.id}</div>
                <div>Name: {batch.name}</div>
                <div>ControllerTemp: {batch.controllerTemperature} C</div>
            </div>
        </div>
    </div>;
};
