import { useState, useEffect, useCallback } from "react";
import { LabeledInput } from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { Table } from "../../../components/Table";
import { LabeledSelect } from "../../../components/Select";
import { Modal } from "../../../components/Modal";
import axios from "axios";
import { debounce } from "lodash";

export function User({ data, setSelectedTab, fetchData }) {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isAddingParticipant, setIsAddingParticipants] = useState(false);
    const [selectedOneShot, setSelectedOneShot] = useState({});
    const [rpgSystems, setRpgSystems] = useState([]);
    const [participatorIdInput, setParticipatorIdInput] = useState();
    const [participatorErrorMessage, setParticipatorErrorMessage] = useState("");
    const [selectedParticipator, setSelectedParticipator] = useState({});
    const [name, setName] = useState("");
    const [system, setSystem] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [master, setMaster] = useState("");
    const [duration, setDuration] = useState("");
    const [addOneShotError, setAddOneShotError] = useState(false);
    const token = localStorage.getItem('authToken');

    useEffect(() => {

    }, []);


    const changeNameInput = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const changeSystem = (e) => {
        const value = e.target.value;
        setSystem(value);
    }

    const changeMaxParticipants = (e) => {
        const value = e.target.value;
        setMaxParticipants(value);
    }

    const changeMaster = (e) => {
        const value = e.target.value;
        setMaster(value);
    }

    const changeDuration = (e) => {
        const value = e.target.value;
        setDuration(value);
    }

    const changeParticipatorIdInput = (e) => {
        const value = e.target.value;
        setParticipatorIdInput(value);
        searchParticipator(value);
    }

    const cleanInputs = () => {
        setName("");
        setSystem("");
        setMaxParticipants("");
        setMaster("");
        setDuration("");
    }

    // const searchParticipator = useCallback(
    //     debounce((input) => {
    //         try {
    //             setParticipatorErrorMessage("");
    //             if (input !== "") {
    //                 const cleanInput = input.replace(/\D/g, '');
    //                 const result = data.participators.find(participator => participator.identifier === cleanInput);

    //                 if (result) {
    //                     setSelectedParticipator(result);
    //                 } else {
    //                     document.getElementById("participatorNotInTheCeremonyModal")?.showModal();
    //                     setSelectedParticipator({});
    //                 }
    //             }
    //         } catch (error) {
    //             setSelectedParticipator({});
    //         }
    //     }, 1000),
    //     [],
    // );

    return (
        <>
            {isAddingUser ?
                <div className="flex flex-col items-center mt-8">
                    <div className="w-1/2 flex flex-col gap-4">
                        <div className="flex gap-12 items-end">
                            <LabeledInput
                                description="Nome"
                                placeholder="Nome Completo"
                                toUppercase={false}
                                value={name}
                                onChange={changeMaxParticipants}
                            />
                            <LabeledInput
                                description="Usuário"
                                placeholder="nomedeusuario"
                                toUppercase={false}
                                value={username}
                                onChange={changeMaxParticipants}
                            />
                        </div>
                        <LabeledInput
                            description="CPF ou RA"
                            placeholder="00000000"
                            toUppercase={false}
                            value={name}
                            onChange={changeNameInput}
                        />
                        <LabeledSelect
                            description="Mestre"
                            options={[
                                { id: "", text: "Selecione" },
                                // ...users.map(user => ({ id: user._id, text: user.name }))
                            ]}
                            toUppercase={false}
                            value={master}
                            onChange={changeMaster}
                        />
                        <LabeledSelect
                            description="Duração"
                            options={[
                                { id: "", text: "Selecione" },
                                { id: "1h", text: "1h" },
                                { id: "1:30h", text: "1:30h" },
                                { id: "2h", text: "2h" },
                                { id: "3h", text: "3h" },
                                { id: "4h", text: "4h" }
                            ]}
                            toUppercase={false}
                            value={duration}
                            onChange={changeDuration}
                        />
                        {addOneShotError &&
                            <span className="text-red-400 font-bold text-center">Preencha todos os campos</span>
                        }
                        <div className="flex justify-center">
                            <PrimaryButton
                                className="w-fit text-2xl font-bold px-8 mt-6"
                                onClick={handleAddOneShot}
                                text="Adicionar ao evento"
                                fullWidth={false}
                            />
                        </div>
                    </div>
                </div>
                :
                <div className="w-full flex flex-col px-14 mt-4">
                    <Table
                        column={["Nome", "Usuário", "Acesso"]}
                        data={data?.map(item => {
                            return {
                                _id: item._id,
                                name: item.name,
                                username: item.username,
                                role: "Adicionar populate"
                            }
                        })}
                        hasEdit={false}
                        hasDelete={false}
                        hasAddPresence={false}
                    />
                    <div className="flex w-full justify-end mt-9">
                        <div className="">
                            <PrimaryButton
                                className="text-2xl font-bold px-8"
                                onClick={() => setIsAddingUser(true)}
                                text="cadastrar usuário"
                            />
                        </div>
                    </div>
                </div>
            }
            <Modal
                modalId="participatorNotInTheCeremonyModal"
                content={
                    <div className="w-full flex flex-col gap-4 px-8 items-center">
                        <span className="font-bold text-2xl text-center text-white">
                            Participante não cadastrado no evento, <br />deseja cadastrar o participante?
                        </span>
                        <PrimaryButton
                            className="text-2xl font-bold px-8 my-4 w-10/12"
                            text="Cadastrar"
                            toUppercase={false}
                            fullWidth={false}
                            onClick={async () => {
                                setSelectedTab("participantRegister");
                                document.getElementById("participatorNotInTheCeremonyModal")?.close();
                            }}
                        />
                    </div>
                }
            />
        </>
    )
}