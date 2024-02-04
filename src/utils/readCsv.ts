import Papa from 'papaparse'

export const readCsv = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse(file, {
        header: false,
        complete: (results) => {
          resolve(results.data)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
