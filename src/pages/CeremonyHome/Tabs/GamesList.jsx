import { useState } from "react";
import { LabeledInput } from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { Table } from "../../../components/Table";
import { LabeledSelect } from "../../../components/Select";

export function GamesList({ data }) {
    const [isAddingGame, setIsAddingGame] = useState(false);

    return (
        <>
            {isAddingGame ?
                <div className="flex flex-col items-center">
                    <div className="w-1/3 flex flex-col gap-4">
                        <LabeledInput
                            description="Código de barras"
                            className="w-1/2 h-14 bg-amber-50 text-zinc-900 m-0 text-2xl p-2 rounded-lg"
                        />
                        <LabeledSelect
                            description="Jogo"
                            options={[
                                { id: "", text: "Selecione" }
                            ]}
                        />
                        <LabeledInput
                            description="Proprietário"
                        />
                        <PrimaryButton
                            className="text-2xl font-bold px-8 mt-6"
                            onClick={() => setIsAddingGame(true)}
                            text="Adicionar ao evento"
                        />
                    </div>
                </div>
                :
                <div className="w-full flex flex-col px-14">
                    {/* <Table
                        column={["Jogo emprestado", "Solicitante", "Horário"]}
                        // data={[{}]}
                        // onEdit={handleEdit}
                        // onDelete={handleDelete}
                        // hasAddPresence={false}
                        // hasEdit={true}
                        // hasDelete={true}
                        // onRowClick={handleRowClick}
                    /> */}
                    <div className="flex w-full justify-end">
                        <div className="">
                            <PrimaryButton
                                className="text-2xl font-bold px-8"
                                onClick={() => setIsAddingGame(true)}
                                text="Criar Novo Evento"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}