import { LevelSelector } from './LevelSelector'
import { NameInput } from './NameInput'
import { PhotoUpload } from './PhotoUpload'
import { TitleInput } from './TitleInput'

type BannerControlsProps = {
  level: string
  name: string
  zoom: number
  title: string
  onTitleChange: (title: string) => void
  onLevelChange: (level: string) => void
  onNameChange: (name: string) => void
  onPhotoChange: (photo: string) => void
  onDownload: () => void
  onZoomChange: (zoom: number) => void
  photo: string | null
}

export function BannerControls({
  level,
  name,
  title,
  onTitleChange,
  onLevelChange,
  onNameChange,
  onPhotoChange,
  onDownload,
  zoom,
  onZoomChange,
  photo,
}: BannerControlsProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-80 bg-slate-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-xl font-bold">Banner Creator</h2>

      <LevelSelector level={level} onLevelChange={onLevelChange} />
      <NameInput name={name} onNameChange={onNameChange} />
      <TitleInput title={title} onTitleChange={onTitleChange} />
      <PhotoUpload onPhotoChange={onPhotoChange} />

      {photo && (
        <label className="text-slate-200 text-sm mt-2">
          Zoom Avatar
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.01}
            value={zoom}
            onInput={(e) =>
              onZoomChange(Number((e.target as HTMLInputElement).value))
            }
            className="w-full mt-1"
          />
        </label>
      )}

      <button
        className="mt-4 p-2 bg-fuchsia-600 hover:bg-fuchsia-500 transition text-white rounded shadow"
        onClick={onDownload}
      >
        Download Banner
      </button>
    </div>
  )
}
