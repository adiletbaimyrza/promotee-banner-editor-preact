import { useRef, useEffect } from 'preact/hooks'
import { promotionLevels } from '../constants'

type UserBannerCanvasProps = {
  level: string
  name: string
  title: string
  photo: string | null
  zoom: number
  offset: { x: number; y: number }
}

export const useBannerCanvas = ({
  level,
  name,
  title,
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
    const offsetByLevel =
      promotionLevels.find((l) => l.level === level)?.offsetByLevel ?? 10

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
          const size = canvas.width * 0.7
          const x = (canvas.width - size) / 2
          const y = (canvas.height - size) / 2 + 13

          drawHexAvatar(
            ctx,
            avatar,
            x,
            y,
            size,
            zoom,
            offset,
            120,
            offsetByLevel
          )
          drawText(ctx, name, lvl.color, canvas, offsetByLevel + 50, 72, 1200)
          drawText(ctx, title, lvl.color, canvas, offsetByLevel + 120, 50, 1200)
        }
      } else {
        drawText(ctx, name, lvl.color, canvas, offsetByLevel + 50, 72, 1200)
        drawText(ctx, title, lvl.color, canvas, offsetByLevel + 120, 50, 1200)
      }
    }
  }, [level, name, title, photo, zoom, offset])

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
    offset: { x: number; y: number } = { x: 0, y: 0 },
    cornerRadius: number = 80,
    offsetByLevel: number
  ) {
    ctx.save()

    const centerX = x + size / 2
    const centerY = y + size / 2 + offsetByLevel
    const radius = size / 2
    const vertices: { x: number; y: number }[] = []

    for (let i = 0; i < 6; i++) {
      vertices.push({
        x: centerX + radius * Math.cos((Math.PI / 3) * i - Math.PI / 6),
        y: centerY + radius * Math.sin((Math.PI / 3) * i - Math.PI / 6),
      })
    }

    ctx.beginPath()

    for (let i = 0; i < 6; i++) {
      const current = vertices[i]
      const next = vertices[(i + 1) % 6]
      const prev = vertices[(i + 5) % 6]

      const toPrev = {
        x: prev.x - current.x,
        y: prev.y - current.y,
      }
      const toNext = {
        x: next.x - current.x,
        y: next.y - current.y,
      }

      const toPrevLen = Math.sqrt(toPrev.x * toPrev.x + toPrev.y * toPrev.y)
      const toNextLen = Math.sqrt(toNext.x * toNext.x + toNext.y * toNext.y)

      toPrev.x /= toPrevLen
      toPrev.y /= toPrevLen
      toNext.x /= toNextLen
      toNext.y /= toNextLen

      const controlPoint1 = {
        x: current.x + toPrev.x * cornerRadius,
        y: current.y + toPrev.y * cornerRadius,
      }
      const controlPoint2 = {
        x: current.x + toNext.x * cornerRadius,
        y: current.y + toNext.y * cornerRadius,
      }

      if (i === 0) {
        ctx.moveTo(controlPoint1.x, controlPoint1.y)
      } else {
        ctx.lineTo(controlPoint1.x, controlPoint1.y)
      }

      ctx.quadraticCurveTo(
        current.x,
        current.y,
        controlPoint2.x,
        controlPoint2.y
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

    const imageCenterX = x + size / 2 + offset.x
    const imageCenterY = y + size / 2 + offset.y

    ctx.drawImage(
      img,
      imageCenterX - drawWidth / 2,
      imageCenterY - drawHeight / 2,
      drawWidth,
      drawHeight
    )
    ctx.restore()
  }
  function drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    color: string,
    canvas: HTMLCanvasElement,
    offsetByLevel: number,
    fontSize: number,
    maxWidth?: number
  ) {
    ctx.textAlign = 'center'
    ctx.font = `800 italic ${fontSize}px Arial`
    ctx.fillStyle = color

    const upperText = text.toUpperCase()
    const x = canvas.width / 2
    const baseY = canvas.height * 0.834 + offsetByLevel

    if (!maxWidth) {
      ctx.fillText(upperText, x, baseY)
      return
    }

    const lines = wrapText(ctx, upperText, maxWidth)
    const lineHeight = fontSize * 1.2

    const totalHeight = lines.length * lineHeight
    const startY = baseY - totalHeight / 2 + lineHeight / 2

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight
      ctx.fillText(line, x, y)
    })
  }

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i]
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine)
        currentLine = words[i]
      } else {
        currentLine = testLine
      }
    }

    if (currentLine !== '') {
      lines.push(currentLine)
    }

    return lines
  }

  // Usage example:
  // drawText(ctx, "This is a long text that will wrap", "red", canvas, 0, 24, 200)

  return { canvasRef, handleDownload }
}
