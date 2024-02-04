import { Project } from '../types'

export function calculateOverlap(range1: Project, range2: Project): any | null {
  const start = new Date(
    Math.max(range1.dateFrom.getTime(), range2.dateFrom.getTime())
  )
  const end = new Date(
    Math.min(range1.dateTo.getTime(), range2.dateTo.getTime())
  )

  if (start <= end) {
    return {
      dateFrom: start,
      dateTo: end
    }
  }

  return null
}
