import { Project } from '../types'
import { calculateOverlap } from './calculateOverlap'
import { getDuration } from './getDuration'
import { isLonger } from './isLonger'

export const findLongestRunningOverlap = (
  empProject1: Project[],
  empProject2: Project[],
  projectId: string
) => {
  const projectEmp1 = empProject1.filter((x) => x.projectID === projectId)
  const projectEmp2 = empProject2.filter((x) => x.projectID === projectId)

  let longestOverlap = { dateFrom: new Date(), dateTo: new Date() }

  for (const dateRange1 of projectEmp1) {
    for (const dateRange2 of projectEmp2) {
      const overlap = calculateOverlap(dateRange1, dateRange2)

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
