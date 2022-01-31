import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Mirow(props) {
	let classtype = "row-dark-2"
	if (props.type === "1") classtype = "row-dark-1"
	if (props.type === "2") classtype = "row-dark-2"
	if (props.type === "3") classtype = "row-dark-3"
	let coltype = "col-dark-1"
	if (props.coltype === "1") coltype = "col-dark-1"
	if (props.coltype === "2") coltype = "col-dark-2"
	return <Row className={classtype}>
		<Col className={coltype}>{props.name}</Col>
		<Col className={coltype}>{props.data} </Col>
	</Row>
}

export {Mirow}