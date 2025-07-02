import type React from 'preact/compat'
import { useRef, useCallback } from 'preact/hooks'

interface BannerPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  offset: { x: number; y: number }
  setOffset: (
    offset:
      | { x: number; y: number }
      | ((prev: { x: number; y: number }) => { x: number; y: number })
  ) => void
  zoom: number
  photo: string | null
}

export const BannerPreview = ({
  canvasRef,
  setOffset,
  photo,
}: BannerPreviewProps) => {
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0 })

  const getCanvasCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      }
    },
    [canvasRef]
  )

  const onPointerDown = useCallback(
    (e: any) => {
      e.preventDefault()
      const coords = getCanvasCoordinates(e.clientX, e.clientY)
      dragRef.current.isDragging = true
      dragRef.current.lastX = coords.x
      dragRef.current.lastY = coords.y
    },
    [getCanvasCoordinates]
  )

  const onPointerMove = useCallback(
    (e: any) => {
      if (!dragRef.current.isDragging) return

      const coords = getCanvasCoordinates(e.clientX, e.clientY)
      const dx = coords.x - dragRef.current.lastX
      const dy = coords.y - dragRef.current.lastY

      setOffset((prev: { x: number; y: number }) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }))

      dragRef.current.lastX = coords.x
      dragRef.current.lastY = coords.y
    },
    [getCanvasCoordinates, setOffset]
  )

  const onPointerUp = useCallback(() => {
    dragRef.current.isDragging = false
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-slate-200 text-lg mb-2">Preview</h2>
      <div
        className="relative"
        onPointerDown={photo ? onPointerDown : undefined}
        onPointerMove={photo ? onPointerMove : undefined}
        onPointerUp={photo ? onPointerUp : undefined}
        onPointerLeave={photo ? onPointerUp : undefined}
        style={{ touchAction: 'none', cursor: photo ? 'grab' : 'default' }}
      >
        <canvas
          ref={canvasRef}
          className="border border-slate-700 bg-slate-950 max-w-full max-h-[600px] object-contain rounded-lg shadow"
        />
      </div>
    </div>
  )
}
