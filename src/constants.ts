import middleBanner from './assets/banners/middle_newest.png'
import seniorBanner from './assets/banners/senior_newest.png'
import leadBanner from './assets/banners/lead_newest.png'
import principalBanner from './assets/banners/principal_newest.png'
import type { PromotionLevel } from './types'

export const promotionLevels: PromotionLevel[] = [
  { level: 'Middle', color: '#002856', img: middleBanner, offsetByLevel: 60 },
  { level: 'Senior', color: '#ffffff', img: seniorBanner, offsetByLevel: 60 },
  { level: 'Lead', color: '#ffffff', img: leadBanner, offsetByLevel: 60 },
  {
    level: 'Principal',
    color: '#ffffff',
    img: principalBanner,
    offsetByLevel: 60,
  },
]
