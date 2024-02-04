import { PairResults } from '../types'
import { findLongestRunningPairProject } from '../utils/findLongestRunningPairProject'

const csvParsed = [
  ['143', '12', '2013-11-01', '2014-01-05'],
  ['218', '10', '2012-05-16', 'NULL'],
  ['143', '10', '2009-01-01', '2011-04-27'],
  ['306', '10', '2009-01-01', '2011-05-27'],
  ['143', '10', '2009-01-01', '2011-04-27'],
  ['218', '10', '2012-06-16', 'NULL'],
  ['143', '10', '2009-01-01', '2011-04-27'],
  ['106', '10', '2000-01-01', 'NULL']
]

const expectedResult: PairResults = {
  empOne: '106',
  empTwo: '218',
  projectId: '10',
  duration: 4281.6
}

test('finding longest running pair project', async () => {
  const result = await findLongestRunningPairProject(csvParsed)

  expect(result).toEqual(expectedResult)
})

test('finding longest running pair project with different date format', async () => {
  csvParsed[7] = ['106', '10', '01-01-2000', 'NULL']

  const result = await findLongestRunningPairProject(csvParsed)

  expect(result).toEqual(expectedResult)
})
