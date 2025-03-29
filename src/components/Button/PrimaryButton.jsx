export function PrimaryButton({ text, type, onClick, className, ...props }) {
  return (
    <button
      className={`h-20 w-full bg-amber-400 text-zinc-100 uppercase ${className ? className : "text-5xl"} rounded-lg hover:opacity-70`}
      onClick={(event) => onClick && onClick(event)}
      type={type}
      {...props}
    >
      {text}
    </button>
  )
}