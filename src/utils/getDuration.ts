import { Project } from './findLongestPair'

export const getDuration = (project: Project) => {
  const differenceInMs = project.dateFrom.getTime() - project.dateTo.getTime()

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)

  return differenceInDays
}
