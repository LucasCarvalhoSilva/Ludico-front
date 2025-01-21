export function PrimaryButton({text, type, onClick, ...props}) {
  return(
    <button 
      className="h-20 w-full bg-amber-400 text-zinc-100 uppercase text-5xl rounded-lg"
      onClick={(event) => onClick && onClick(event)}
      type={type}
      {...props}
    >
      {text}
    </button>
  )
}