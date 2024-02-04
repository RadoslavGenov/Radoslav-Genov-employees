import { useState } from 'react'
import { PairResults } from '../../types'
import FileInput from '../../components/FileInput/FileInput'
import Table from '../../components/Table/Table'
import styles from './Landing.module.css'

const Landing: React.FC = () => {
  const [data, setData] = useState<PairResults>({} as PairResults)

  const handleFileCompletion = (data: PairResults) => {
    setData(data)
  }

  return (
    <div className={styles.container}>
      <FileInput onComplete={handleFileCompletion} />

      <Table data={[data]} />
    </div>
  )
}

export default Landing
