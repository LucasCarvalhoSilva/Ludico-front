import { useState } from "react";
import { LabeledInput } from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { Table } from "../../../components/Table";
import { LabeledSelect } from "../../../components/Select";

export function OneShotsList({ data }) {
    const [isAddingOneShot, setIsAddingOneShot] = useState(false);
    const [isAddingParticipant, setIsAddingParticipants] = useState(false);

    return (
        <>
            {isAddingOneShot ?
                <div className="flex flex-col items-center">
                    <div className="w-1/2 flex flex-col gap-4">
                        <LabeledInput
                            description="Aventura"
                        />
                        <div className="flex gap-12 items-end">
                            <LabeledSelect
                                description="Sistema"
                                options={[
                                    { id: "", text: "Selecione" }
                                ]}
                            />
                            <LabeledInput
                                description="Quantidade máxima de participantes"
                                type="number"
                            />
                        </div>
                        <LabeledSelect
                            description="Mestre"
                            options={[
                                { id: "", text: "Selecione" }
                            ]}
                        />
                        <LabeledSelect
                            description="Duração"
                            options={[
                                { id: "", text: "Selecione" }
                            ]}
                        />
                        <PrimaryButton
                            className="text-2xl font-bold px-8 mt-6"
                            onClick={() => setIsAddingGame(true)}
                            text="Adicionar ao evento"
                        />
                    </div>
                </div>
                :
                isAddingParticipant ?
                    <div className="flex flex-col items-center">
                        <div className="w-1/2 flex flex-col gap-4">
                            <LabeledInput
                                description="CPF OU RA"
                            />
                            <div className="flex gap-12 items-end">
                                <LabeledSelect
                                    description="Classe"
                                    options={[
                                        { id: "", text: "Selecione" }
                                    ]}
                                />
                                <LabeledSelect
                                    description="Raça"
                                    options={[
                                        { id: "", text: "Selecione" }
                                    ]}
                                />
                            </div>
                            <LabeledSelect
                                description="Participante"
                                options={[
                                    { id: "", text: "Selecione" }
                                ]}
                            />
                            <PrimaryButton
                                className="text-2xl font-bold px-8 mt-6"
                                onClick={() => setIsAddingGame(true)}
                                text="Adicionar participante"
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
                                    onClick={() => setIsAddingOneShot(true)}
                                    text="cadastrar oneshot"
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}