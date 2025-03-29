import { LabeledInput } from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { Table } from "../../../components/Table";

export function CeremonyManaging({ data }) {
    console.log(data)
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex gap-12 justify-around">
                <div className="flex flex-col gap-4 w-1/3">
                    <LabeledInput
                        description="ra/cpf"
                    />
                    <LabeledInput
                        description="nome"
                    />
                    <PrimaryButton
                        className="text-xl font-bold px-8 mt-8"
                        text="Adicionar Participante"
                    />
                </div>
                <div className="w-[1px] bg-white h-[350px]" />
                <div className="flex flex-col gap-4 w-1/3">
                    <LabeledInput
                        description="jogo"
                    />
                    <LabeledInput
                        description="solicitante"
                    />
                    <PrimaryButton
                        className="text-xl font-bold px-8 mt-8"
                        text="Emprestar Jogo"
                    />
                </div>
            </div>
            {/* <Table
                column={["Jogo emprestado", "Solicitante", "Horário"]}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hasAddPresence={false}
                hasEdit={true}
                hasDelete={true}
                onRowClick={handleRowClick}
            /> */}
        </div>
    )
}