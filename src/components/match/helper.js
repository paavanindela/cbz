import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TableRow(props) {
	const id = props.id
	const row = props.row
	if(props.type==="1")
	return (
		<tr key={props.id}>
			{row.map((val, idx) => {
				if (idx == 0) {
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
	return <Container>
		<table className='hoverTable'>
			<thead><tr>{headers.map((head, id) => <th key={id}>{head}</th>)}</tr></thead>
			<tbody>{body.map((row, id) => <TableRow key={id} row={row} id={player_id[id]} type={"1"} />)}</tbody>
		</table>
	</Container>;
}

function Extatot(props) {
	return <Container>
		<Row className="row-dark-1">
			<Col className="col-dark-2">EXTRAS </Col>
			<Col className="col-dark-2">{props.total.extra} </Col>
		</Row>
		<Row className="row-dark-1">
			<Col className="col-dark-2">TOTAL </Col>
			<Col className="col-dark-2"> RUNS: {props.total.total} </Col>
			<Col className="col-dark-2"> WICKETS: {props.total.wickets} </Col>
		</Row>
	</Container>;
}

function Mirow(props) {
	let classtype = "row-dark-2"
	if (props.type === "1") classtype = "row-dark-1"
	if (props.type === "2") classtype = "row-dark-2"
	if (props.type === "3") classtype = "row-dark-3"
	return <Row className={classtype}>
		<Col className="col-dark-1">{props.name}</Col>
		<Col className="col-dark-1">{props.data} </Col>
	</Row>
}

export {Mirow,Extatot,CreateTable,TableRow}