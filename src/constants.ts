import middleBanner from './assets/banners/middle_new.png'
import seniorBanner from './assets/banners/senior_new.png'
import leadBanner from './assets/banners/lead_new.png'
import principalBanner from './assets/banners/principal_new.png'
import type { PromotionLevel } from './types'

export const promotionLevels: PromotionLevel[] = [
  { level: 'Middle', color: '#002856', img: middleBanner, offsetByLevel: 20 },
  { level: 'Senior', color: '#ffffff', img: seniorBanner, offsetByLevel: 80 },
  { level: 'Lead', color: '#ffffff', img: leadBanner, offsetByLevel: 10 },
  {
    level: 'Principal',
    color: '#ffffff',
    img: principalBanner,
    offsetByLevel: 60,
  },
]
