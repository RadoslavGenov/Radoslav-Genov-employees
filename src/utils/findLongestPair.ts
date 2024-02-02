import { parse } from 'csv'
import { parseDate } from './parseDate'
import * as fs from 'fs'
import { getDuration } from './getDuration'

export type Project = Readonly<{
  projectID: string
  dateFrom: Date
  dateTo: Date
}>

type EmployeeProjects = {
  [key: string]: Project[]
}

export const findLongestPair = async (
  filePath: string
): Promise<[string | null, string | null, number] | undefined> => {
  const employeeProjects: EmployeeProjects = {}

  const parser = parse({ columns: true })

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parser)
        .on('data', (row) => {
          const { EmpID, ProjectID, DateFrom, DateTo } = row
          const dateFrom = parseDate(DateFrom)
          const dateTo = parseDate(DateTo)

          if (!employeeProjects[EmpID]) {
            employeeProjects[EmpID] = []
          }

          employeeProjects[EmpID].push({
            projectID: ProjectID,
            dateFrom,
            dateTo
          })
        })
        .on('end', resolve)
        .on('error', reject)
    })

    let longestDuration = 0
    let longestPair: [string | null, string | null] = [null, null]

    const empKeys = Object.keys(employeeProjects)

    for (let i = 0; i < empKeys.length - 1; i++) {
      for (let j = i + 1; j < empKeys.length; j++) {
        const emp1 = empKeys[i]
        const emp2 = empKeys[j]

        const commonProjects = employeeProjects[emp1].filter((project1) =>
          employeeProjects[emp2].some(
            (project2) => project1.projectID === project2.projectID
          )
        )

        for (const project of commonProjects) {
          const duration = getDuration(project)

          if (duration > longestDuration) {
            longestDuration = duration
            longestPair = [emp1, emp2]
          }
        }
      }
    }

    return [longestPair[0], longestPair[1], longestDuration]
  } catch (error) {
    console.error(error)
  }
}
