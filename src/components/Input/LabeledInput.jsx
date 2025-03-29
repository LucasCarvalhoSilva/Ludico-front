import { Input } from "./Input"
import { Label } from "../label"

export function LabeledInput({description = "", type = "text", name, placeholder, value, onChange, ...props}) {
  
  return (
    <div className="flex w-full flex-col">
      <Label description={description}/>
      <Input 
        description={placeholder} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}