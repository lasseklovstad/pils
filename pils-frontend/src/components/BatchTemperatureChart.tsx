import {ITemperature} from "../api/batch.api";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type BatchTemperatureChartProps = {
    temperatures: ITemperature[]
};
export const BatchTemperatureChart = ({temperatures}: BatchTemperatureChartProps) => {
    const lastMeasurementMillis = Math.max(...temperatures.map(t=>new Date(t.date).valueOf()))
    const data = temperatures.map(batch => ({
        temp: batch.temperature,
        date: batch.date,
        dateValue: (new Date(batch.date).valueOf()-lastMeasurementMillis)/1000/60
    })).filter(dataPoint => dataPoint.temp > -50 && dataPoint.temp < 80)



    return<div className="md:h-[600px] sm:h-[400px] p-2">
        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type={"number"} dataKey="dateValue"/>
                <YAxis  type={"number"} allowDecimals domain={['dataMin', 'dataMax']}  orientation={"right"} />
                <Tooltip/>
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" strokeWidth={3} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
};