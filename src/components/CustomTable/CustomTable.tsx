import {Column, useTable} from "react-table";
import {Table} from "reactstrap";

type Props = {
    columns:  ReadonlyArray<Column>,
    data: object[],
    onClick: (value:number) => void
}

const CustomTable = ({ columns, data, onClick }:Props) => {
    const {
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    })

    const onTdClicked = (row:any, e: any) => {
        if (e.target.tagName != "BUTTON") {
            onClick(row.values.id)
        }
    }

    return (
        <Table hover>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} key={row.getRowProps().key} onClick={(e) => onTdClicked(row, e)} style={{cursor: "pointer"}}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                {cell.column.id === 'id' ? i + 1 : cell.render('Cell')}
                            </td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

export default CustomTable
