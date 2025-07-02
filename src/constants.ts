import juniorBanner from './assets/banners/junior.png'
import middleBanner from './assets/banners/middle.png'
import seniorBanner from './assets/banners/senior.png'
import leadBanner from './assets/banners/lead.png'
import principalBanner from './assets/banners/principal.png'
import type { PromotionLevel } from './types'

export const promotionLevels: PromotionLevel[] = [
  { level: 'Junior', color: '#8dc63f', img: juniorBanner },
  { level: 'Middle', color: '#fe8e23', img: middleBanner },
  { level: 'Senior', color: '#c197c9', img: seniorBanner },
  { level: 'Lead', color: '#e45062', img: leadBanner },
  {
    level: 'Principal',
    color: '#ffe611',
    img: principalBanner,
  },
]
