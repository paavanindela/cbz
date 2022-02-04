import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TableRow(props) {
	const id = props.id
	const row = props.row
	if (props.type === "1")
		return (
			<tr key={props.id}>
				{row.map((val, idx) => {
					if (idx === 0) {
						return <td key={idx}><Link to={"/players/" + id}>{val}</Link></td>;
					}
					else {
						return <td key={idx}>{val}</td>;
					}
				})}
			</tr>
		)
	else
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
	return <div className='ipl-table-wrapper' style={{ width: "100%" }}>
		<div className='table-section'>
			<div>
				<table className='ipl-table'>
					<thead><tr className='head'>{headers.map((head, id) => <th key={id}>{head}</th>)}</tr></thead>
					<tbody>
						{body.map((row, id) => <TableRow key={id} row={row} id={player_id[id]} type={"1"} />)}
					</tbody>
				</table>
				<table className='ipl-table'>
					<thead><tr className='head'><th>{props.nt}</th></tr></thead>
					<tbody><td>{props.value}</td></tbody>
				</table>
			</div>
		</div>
	</div>;
}

function Mirow(props) {
	if(props.type==="2")
		return <tr className='head'>
			<td>{props.name}</td>
			<td>{props.data}</td>
		</tr>;
	else 
		return <tr>
			<td>{props.name}</td>
			<td>{props.data}</td>
		</tr>;
}

export { Mirow, CreateTable, TableRow }