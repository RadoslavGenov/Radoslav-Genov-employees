import { Project } from '../types'
import { calculateOverlap } from './calculateOverlap'
import { getDuration } from './getDuration'
import { isLonger } from './isLonger'

export const findLongestRunningOverlap = (
  empProjectOne: Project[],
  empProjectTwo: Project[],
  projectId: string
) => {
  let longestOverlap = { dateFrom: new Date(), dateTo: new Date() }

  for (const dateRangeOne of empProjectOne) {
    for (const dateRangeTwo of empProjectTwo) {
      const overlap = calculateOverlap(dateRangeOne, dateRangeTwo)

      if (overlap !== null && isLonger(overlap, longestOverlap as any)) {
        longestOverlap = overlap
      }
    }
  }

  return {
    duration: getDuration(longestOverlap.dateFrom, longestOverlap.dateTo),
    projectId: projectId
  }
}
