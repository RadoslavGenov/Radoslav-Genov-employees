import { PairResults } from '../../types'
import styles from './Table.module.css'

type TableProps = Readonly<{
  data: PairResults[]
}>

const tableHead = [
  'Employee One',
  'Employee Two',
  'Project ID',
  'Duration (days)'
]

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {tableHead.map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>

      {data.map(
        (item) =>
          Object.keys(item).length !== 0 && (
            <tbody key={item.empOne + item.empTwo}>
              {Object.values(item).map((value) => (
                <td>{value}</td>
              ))}
            </tbody>
          )
      )}
    </table>
  )
}

export default Table
