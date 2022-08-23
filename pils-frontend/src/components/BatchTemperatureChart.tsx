import {ITemperature} from "../api/batch.api";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Text} from "./Text";

type BatchTemperatureChartProps = {
    temperatures: ITemperature[]
};
export const BatchTemperatureChart = ({temperatures}: BatchTemperatureChartProps) => {
    const now = temperatures[0]?.date
    const data = temperatures.map(batch => ({
        temp: batch.temperature,
        dateValue: ((new Date(batch.date)).valueOf()-now)/(1000*60),
        date: batch.date
    })).filter(dataPoint => dataPoint.temp > -50 && dataPoint.temp < 80).sort(function(a, b) {
        return a.dateValue - b.dateValue;
    })

    if(data.length ===0){
        return <Text>Ingen målinger enda!</Text>
    }

    return <div className="md:h-[600px] h-[400px] p-2">
        <ResponsiveContainer>
            <LineChart
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" domain={['dataMin', 'dataMax']}
                        dataKey="dateValue"/>
                <YAxis allowDecimals domain={['dataMin', 'dataMax']}/>
                <Tooltip/>
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" strokeWidth={3} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
};
