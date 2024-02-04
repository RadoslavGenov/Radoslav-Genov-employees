import { ChangeEvent, useRef, useState } from 'react'
import styles from './FileInput.module.css'
import { findLongestRunningPairProject } from '../../utils/findLongestRunningPairProject'
import { readCsv } from '../../utils/readCsv'
import { FileInputProps } from './FileInput.types'

const FileInput: React.FC<FileInputProps> = ({ onComplete }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [name, setName] = useState('')

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!inputRef.current) {
      return
    }

    const file = inputRef.current.files?.[0]

    if (!file) {
      return
    }

    setName(file.name)

    const parsed = await readCsv(file)

    inputRef.current.value = ''

    const result = await findLongestRunningPairProject(parsed)

    onComplete(result)
  }

  return (
    <>
      <label htmlFor="file" className={styles.label}>
        Please choose a file
      </label>
      <span className={styles.name}>{name}</span>
      <input
        ref={inputRef}
        onChange={handleFileInput}
        className={styles.input}
        type="file"
        id="file"
        name="file"
        accept=".csv"
      />
    </>
  )
}

export default FileInput
