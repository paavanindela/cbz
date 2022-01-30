import React from 'react';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pointstable.scss'

function TableRow(props) {
	const id = props.id
	const row = props.row
	return (
		<tr key={props.id}>
			{row.map((val, idx) => {
				return <td key={idx}>{val}</td>;
			})}
		</tr>
	)
}

function CreateTable(props) {
	const headers = props.headers
	const data = props.data
	const access = props.access
	const body = data.map(entry => {
		return access.map(key => entry[key])
	})
	const player_id = data.map(entry => {
		return entry[props.keyname]
	})
	// console.log(body)
	return <Container>
		<table className='hoverTable'>
			<thead><tr>{headers.map((head, id) => <th key={id}>{head}</th>)}</tr></thead>
			<tbody>{body.map((row, id) => <TableRow key={id} row={row} id={player_id[id]} type={"1"} />)}</tbody>
		</table>
	</Container>;
}

export {CreateTable,TableRow}