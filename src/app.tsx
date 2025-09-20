import { useState } from 'preact/hooks'
import { BannerControls } from './components/BannerControls'
import { BannerPreview } from './components/BannerPreview'
import { useBannerCanvas } from './hooks/useBannerCanvas'
import { promotionLevels } from './constants'

const INITIAL = {
  level: promotionLevels[0].level,
  name: '',
  title: '',
}

export function App() {
  const [level, setLevel] = useState(INITIAL.level)
  const [name, setName] = useState(INITIAL.name)
  const [photo, setPhoto] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [title, setTitle] = useState(INITIAL.title)

  const { canvasRef, handleDownload } = useBannerCanvas({
    level,
    name,
    title,
    photo,
    zoom,
    offset,
  })

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8 bg-slate-900 min-h-screen">
      <BannerControls
        level={level}
        name={name}
        title={title}
        onTitleChange={setTitle}
        onLevelChange={setLevel}
        onNameChange={setName}
        onPhotoChange={setPhoto}
        onDownload={handleDownload}
        zoom={zoom}
        onZoomChange={setZoom}
        photo={photo}
      />
      <BannerPreview
        canvasRef={canvasRef}
        offset={offset}
        setOffset={setOffset}
        zoom={zoom}
        photo={photo}
      />
    </div>
  )
}
