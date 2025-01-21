import { Input } from "./input"
import { Label } from "./label"

export function InputWrapper({description = "", type = "text", name, placeholder, value, onChange, ...props}) {
  
  return (
    <div className="flex w-full flex-col gap-4 ">
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