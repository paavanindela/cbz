import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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

function Xrow(props){
	if(props.hasOwnProperty("access"))
		return [
			<tr className='head'>
				{props.headers.map((entry,idx)=> <td key={idx}>{entry}</td>)}
			</tr>,
			<tr>
				{props.access.map((entry,idx)=> <td key={idx}>{props.data[entry]}</td>)}
			</tr>
		];
	else
		return [
			<tr className='head'>
				{props.headers.map((entry,idx)=> <td key={idx}>{entry}</td>)}
			</tr>,
			<tr>
				{props.headers.map((entry,idx)=> { 
					if(idx===0) return <td key={idx}>{props.name}</td>
					return <td key={idx}>0</td>}
				)}
			</tr>,
		]
}

export {Mirow,Xrow}