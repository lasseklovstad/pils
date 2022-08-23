import {IBatchDetailed, useDeleteBatch, useGetControllers, usePostBatchNotActive, usePutBatch} from "../api/batch.api";
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
import {Select} from "./Select";

type BatchProps = {
    batch: IBatchDetailed
}

export const Batch = ({batch}: BatchProps) => {
    const navigate = useNavigate()
    const {mutate} = usePostBatchNotActive(batch.id)
    const {mutate: mutateBatch, isLoading: isLoadingBatch} = usePutBatch(batch.id)
    const {mutate: deleteBatch} = useDeleteBatch(batch.id)
    const [batchName, setBatchName] = useState(batch.name)
    const controller = useGetControllers()
    const [temp, setTemp] = useState(batch.controllerTemperature.toString())
    const [selectedController, setSelectedController] = useState(batch.microControllerId)
    const [selectedType, setSelectedType] = useState(batch.batchType as string)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutateBatch({
            name: batchName,
            controllerTemperature: parseFloat(temp),
            microControllerId: selectedController,
            batchType: selectedType
        })
    }

    return <>
        <div className="flex items-start justify-between flex-wrap">
            <form onSubmit={handleSubmit} className=" mb-2">
                <Input label="Navn" placeholder="Hva skal pilsen din hete?" value={batchName} onChange={setBatchName}/>
                <Input type="number" label="Temperatur °C" placeholder="Hva skal pilsen din hete?" value={temp}
                       onChange={setTemp}/>
                <Select label={"Velg kontroller"}
                        options={controller.data?.map(c => ({label: c.name, value: c.id})) || []}
                        value={selectedController} onChange={setSelectedController}/>
                <Select label={"Velg batchtype"}
                        options={[{value: "WARM", label: "Varm"}, {value: "COLD", label: "Kald"}]}
                        value={selectedType} onChange={setSelectedType} emptyOption={false}/>
                <Button type="submit" loading={isLoadingBatch}>Lagre</Button>
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
