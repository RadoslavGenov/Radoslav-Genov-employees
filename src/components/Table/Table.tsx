import { PairResults } from '../../types'
import { TABLE_HEAD } from './Table.constants'
import styles from './Table.module.css'
import { TableProps } from './Table.types'

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
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
