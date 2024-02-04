import { Project } from '../types'

export function isLonger(rangeOne: Project, rangeTwo: Project): boolean {
  const duration1 = rangeOne.dateTo.getTime() - rangeOne.dateFrom.getTime()
  const duration2 = rangeTwo.dateTo.getTime() - rangeTwo.dateFrom.getTime()

  return duration1 > duration2
}
