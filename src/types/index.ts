export type Project = Readonly<{
  projectID: string
  dateFrom: Date
  dateTo: Date
}>

export type EmployeeProjects = {
  [key: string]: Project[]
}

export type PairResults = Readonly<{
  empOne: string
  empTwo: string
  projectId: string
  duration: number
}>
