import { useRef, useEffect } from 'preact/hooks'
import { promotionLevels } from '../constants'

type UserBannerCanvasProps = {
  level: string
  name: string
  photo: string | null
  zoom: number
  offset: { x: number; y: number }
}

export const useBannerCanvas = ({
  level,
  name,
  photo,
  zoom,
  offset,
}: UserBannerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lvl = promotionLevels.find((l) => l.level === level)!

    const bg = new Image()
    bg.src = lvl.img
    bg.onload = () => {
      canvas.width = bg.naturalWidth
      canvas.height = bg.naturalHeight
      ctx.drawImage(bg, 0, 0)

      const avatar = new Image()

      if (photo) {
        avatar.src = photo
        avatar.onload = () => {
          const size = canvas.width * 0.74
          const x = (canvas.width - size) / 2
          const y = (canvas.height - size) / 2 + 13

          drawHexAvatar(ctx, avatar, x, y, size, zoom, offset)
          drawText(ctx, name, lvl.color, canvas)
        }
      } else {
        drawText(ctx, name, lvl.color, canvas)
      }
    }
  }, [level, name, photo, zoom, offset])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = Object.assign(document.createElement('a'), {
      href: canvas.toDataURL('image/png'),
      download: `banner-${name || 'employee'}.png`,
    })
    link.click()
  }

  function drawHexAvatar(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    size: number,
    zoom: number = 1,
    offset: { x: number; y: number } = { x: 0, y: 0 }
  ) {
    ctx.save()
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(
        x + size / 2 + (size / 2) * Math.cos((Math.PI / 3) * i - Math.PI / 6),
        y + size / 2 + (size / 2) * Math.sin((Math.PI / 3) * i - Math.PI / 6)
      )
    }
    ctx.closePath()
    ctx.clip()

    const imgAspectRatio = img.naturalWidth / img.naturalHeight
    const hexAspectRatio = 1

    let drawWidth, drawHeight
    if (imgAspectRatio > hexAspectRatio) {
      drawWidth = size * zoom
      drawHeight = drawWidth / imgAspectRatio
    } else {
      drawHeight = size * zoom
      drawWidth = drawHeight * imgAspectRatio
    }

    const centerX = x + size / 2 + offset.x
    const centerY = y + size / 2 + offset.y

    ctx.drawImage(
      img,
      centerX - drawWidth / 2,
      centerY - drawHeight / 2,
      drawWidth,
      drawHeight
    )
    ctx.restore()
  }

  function drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    color: string,
    canvas: HTMLCanvasElement
  ) {
    ctx.textAlign = 'center'
    ctx.font = 'bold 54px Arial'
    ctx.fillStyle = color
    ctx.fillText(text, canvas.width / 2, canvas.height * 0.834)
  }

  return { canvasRef, handleDownload }
}
