export function Input({description = "", type = "text", value, name, onChange, ...props}) {
  
  return (
    <input className="h-14 bg-amber-50 text-zinc-900 w-full m-0 text-2xl p-2 rounded-lg" 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={description}
      {...props}
    />
  )
}