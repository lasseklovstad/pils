import {ITemperature} from "../api/batch.api";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type BatchTemperatureChartProps = {
    temperatures: ITemperature[]
};
export const BatchTemperatureChart = ({temperatures}: BatchTemperatureChartProps) => {
    const now = new Date().valueOf()
    const data = temperatures.map(batch => ({
        temp: batch.temperature,
        dateValue: ((new Date(batch.date)).valueOf()-now)/1000,
        date: batch.date
    })).filter(dataPoint => dataPoint.temp > -50 && dataPoint.temp < 80).sort(function(a, b) {
        return a.dateValue - b.dateValue;
    })
    return <div className="md:h-[600px] sm:h-[400px] p-2">
        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" domain={['dataMin', 'dataMax']}
                        dataKey="dateValue"/>
                <YAxis allowDecimals domain={['dataMin', 'dataMax']} orientation="right"/>
                <Tooltip/>
                <Line type="linear" dataKey="temp" stroke="#82ca9d" strokeWidth={3} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
};