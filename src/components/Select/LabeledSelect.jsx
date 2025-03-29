import { Select } from "./Select"
import { Label } from "../label"

export function LabeledSelect({ description = "", options, ...props }) {

    return (
        <div className="flex w-full flex-col">
            <Label description={description} />
            <Select
                options={options}
                {...props}
            />
        </div>
    )
}