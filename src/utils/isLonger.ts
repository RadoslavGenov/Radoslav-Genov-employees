import { Project } from '../types'

export function isLonger(range1: Project, range2: Project): boolean {
  const duration1 = range1.dateTo.getTime() - range1.dateFrom.getTime()
  const duration2 = range2.dateTo.getTime() - range2.dateFrom.getTime()

  return duration1 > duration2
}
