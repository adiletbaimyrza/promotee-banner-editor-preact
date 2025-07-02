import { promotionLevels } from '../constants'

type LevelSelectorProps = {
  level: string
  onLevelChange: (level: string) => void
}

export function LevelSelector({ level, onLevelChange }: LevelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-200">Promotion Level</label>
      <select
        className="p-2 rounded bg-slate-700 text-white focus:ring-2"
        value={level}
        onChange={(e) => onLevelChange((e.target as HTMLSelectElement).value)}
      >
        {promotionLevels.map((level) => (
          <option key={level.level} value={level.level}>
            {level.level}
          </option>
        ))}
      </select>
    </div>
  )
}
