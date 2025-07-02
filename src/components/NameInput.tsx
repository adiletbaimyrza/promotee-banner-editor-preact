type NameInputProps = {
  name: string
  onNameChange: (name: string) => void
}

export function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-200">Employee Name</label>
      <input
        className="p-2 rounded bg-slate-700 text-white focus:ring-2 focus:ring-fuchsia-400"
        type="text"
        placeholder="Name"
        value={name}
        onInput={(e) => onNameChange((e.target as HTMLInputElement).value)}
      />
    </div>
  )
}
