import { LabeledInput } from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { LabeledSelect } from "../../../components/Select";

export function ParticipantRegister({ data }) {
    console.log(data)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex w-1/2 flex-col gap-4">
                <LabeledInput
                    description="nome"
                    type="text"
                />
                <div className="flex gap-12">
                    <LabeledInput
                        description="ra"
                        type="number"
                    />
                    <LabeledInput
                        description="cpf"
                        type="number"
                    />
                </div>
                <LabeledInput
                    description="e-mail"
                    type="email"
                />
                <div className="flex gap-12">
                    <LabeledInput
                        description="data nascimento"
                        type="date"
                    />
                    <LabeledSelect
                        description="gênero"
                        options={[
                            { id: "", text: "Selecione" },
                            { id: "male", text: "Masculino" },
                            { id: "female", text: "Feminino" },
                        ]}
                    />
                </div>
                <LabeledSelect
                    description="instituição"
                    options={[
                        { id: "", text: "Selecione" },
                        { id: "UTFPR-CP", text: "UTFPR - Cornélio Procópio" },
                        { id: "UTFPR-LONDRINA", text: "UTFPR - Londrina" },
                        { id: "UENP", text: "UENP" },
                        { id: "OUTRAS", text: "Outras" },
                    ]}
                />
            </div>
            <PrimaryButton
                className="w-fit text-xl font-bold px-8 mt-8"
                text="cadastrar"
            />
        </div>
    )
}