import { Project } from '../types'

export function calculateOverlap(rangeOne: Project, rangeTwo: Project): any | null {
  const start = new Date(
    Math.max(rangeOne.dateFrom.getTime(), rangeTwo.dateFrom.getTime())
  )
  const end = new Date(
    Math.min(rangeOne.dateTo.getTime(), rangeTwo.dateTo.getTime())
  )

  if (start <= end) {
    return {
      dateFrom: start,
      dateTo: end
    }
  }

  return null
}
