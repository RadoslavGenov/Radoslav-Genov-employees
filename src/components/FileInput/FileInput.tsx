import { ChangeEvent } from 'react'
import styles from './FileInput.module.css'
import { findLongestPair } from '../../utils/findLongestPair'

const FileInput: React.FC = () => {
  const handleFileInput = (event: any) => {
    const pairs = findLongestPair(event.currentTarget.value)
    debugger
  }

  return (
    <>
      <label htmlFor="file" className={styles.upload}>
        Please choose a file
      </label>
      <input
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
