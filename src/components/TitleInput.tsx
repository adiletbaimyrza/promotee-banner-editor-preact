type TitleInputProps = {
  title: string
  onTitleChange: (title: string) => void
}

export function TitleInput({ title, onTitleChange }: TitleInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-200">New Title</label>
      <input
        className="p-2 rounded bg-slate-700 text-white focus:ring-2 focus:ring-fuchsia-400"
        type="text"
        placeholder="Title"
        value={title}
        onInput={(e) => onTitleChange((e.target as HTMLInputElement).value)}
      />
    </div>
  )
}
