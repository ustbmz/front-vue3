import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)

export const moment = (date: Date) => {
  return dayjs(date)
    .locale('zh-cn')
    .fromNow()
}
