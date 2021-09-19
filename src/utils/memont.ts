import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)

export const moment = (date: Date) => {
  return dayjs(date)
    .locale('zh-cn')
    .fromNow()
}

export const isBefore = (date: Date) => {
  return dayjs().isBefore(date)
}

export const strToDate = (date: number) => {
  return dayjs(date)
}
