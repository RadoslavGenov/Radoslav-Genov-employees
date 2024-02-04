import { parseDate } from './parseDate'
import { findLongestRunningOverlap } from './findLongestRunningOverlap'
import { EmployeeProjects, PairResults } from '../types'

export const findLongestPair = (results: any): Promise<PairResults> => {
  const employeeProjects: EmployeeProjects = {}

  return new Promise((resolve, reject) => {
    try {
      for (const row of results) {
        const [EmpID, ProjectID, DateFrom, DateTo] = row
        const dateFrom = parseDate(DateFrom.trim())
        const dateTo = parseDate(DateTo.trim())

        if (!employeeProjects[EmpID]) {
          employeeProjects[EmpID] = []
        }

        employeeProjects[EmpID].push({
          projectID: ProjectID,
          dateFrom,
          dateTo
        })
      }

      let projectId = ''
      let longestDuration = 0
      let longestPair: { empOne: string; empTwo: string } = {
        empOne: '',
        empTwo: ''
      }

      const empKeys = Object.keys(employeeProjects)

      for (let i = 0; i < empKeys.length - 1; i++) {
        for (let j = i + 1; j < empKeys.length; j++) {
          const empOne = empKeys[i]
          const empTwo = empKeys[j]

          const empOneProjectIds = employeeProjects[empOne].map(
            (x) => x.projectID
          )
          const empTwoProjectIds = employeeProjects[empTwo].map(
            (x) => x.projectID
          )

          const commonProjectsIds = empOneProjectIds.filter((projectOneId) =>
            empTwoProjectIds.some(
              (projectTwoId) => projectOneId === projectTwoId
            )
          )

          for (const id of commonProjectsIds) {
            const result = findLongestRunningOverlap(
              employeeProjects[empOne],
              employeeProjects[empTwo],
              id
            )

            if (result.duration > longestDuration) {
              longestDuration = result.duration
              projectId = result.projectId
              longestPair = { empOne, empTwo }
            }
          }
        }
      }

      resolve({
        ...longestPair,
        projectId,
        duration: longestDuration
      })
    } catch (error) {
      reject(error)
    }
  })
}
