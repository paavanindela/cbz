import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import logo from './../../logo.svg';
import { Container, Row, Col, ButtonGroup, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function IndMatch(props) {
	const entry = props.entry
	return (
		<Container className='container-dark'>
			<Row className="row-dark-1">
				<Col className="col-dark-1">{entry.team_1} </Col>
				<Col md="auto" className="col-dark-1"> VS</Col>
				<Col className="col-dark-1">{entry.team_2} </Col>
			</Row>
			<Row className="row-dark-2">
				<Col className="col-dark-1">{entry.venue_name} </Col>
				<Col className="col-dark-1">{entry.city_name} </Col>
			</Row>
			<Row className="row-dark-3">
				<Col className="col-dark-2">{entry.matchwinner} won by {entry.win_margin} {entry.win_type}</Col>
				<button variant="primary" onClick={
					() => {
						console.log(entry.match_id);
					}
				}>
					More Details
				</button>
			</Row>
			<Row className="row-min"></Row>
		</Container>
	);
}

function MatchList(props) {
	const data = props.data;
	const listItems = data.map((entry, id) =>
		<IndMatch key={id} entry={entry} />
	);
	return (
		// <div className='wrapper'>
		<ul>{listItems}</ul>
		// </div>
	);
}

class Match extends React.Component {
	static navigationOptions = {
		title: 'Selected Item',
		header: null,
	};
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
			search: ' ',
			pageNo: 1,
		};
	}
	componentDidMount() {
		this.getMatches()
	}
	componentDidUpdate() {

	}
	getMatches = () => {
		let r = 0;
		const url = 'http://localhost:5000/matches/'
		const params = {
			page: this.state.pageNo,
		}
		// console.log(this.state.pageNo);
		fetch(url + '?' + (new URLSearchParams(params)).toString(), {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
		})
			.then(response => {
				if (response.status == 200 || response.status === 304) r = 2;
				else r = 1;
				return response.json();
			})
			.then(rdata => {
				this.setState({
					data: rdata.data,
					loading: r,
				});
				// console.log(this.state.data)
			});
	};
	getNext = (stride) => {
		this.setState({
			loading: 0,
			pageNo: Math.max(this.state.pageNo + stride, 1)
		}, () => { this.getMatches() });
	};
	render() {
		let text = "";
		if (this.state.loading === 0) text = "LOADING";
		else if (this.state.loading === 1) text = "FAILED TO LOAD DATA";
		else return (
			<div className="App">
				<header className='title'>
					MATCHES
				</header>
				<MatchList data={this.state.data} />
				<ButtonGroup size="lg" className="mb-2" >
					<button onClick={() => this.getNext(-1)} variant="secondary">
						PREV
					</button>
					<button onClick={() => this.getNext(1)} variant="secondary">
						NEXT
					</button>
				</ButtonGroup>
			</div>
		);
		return (
			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<p> {text}</p>
				</header>
			</div>
		);
	}
}

const matchPropTypes = {
	// always use prop types!
};

Match.propTypes = matchPropTypes;

export default Match;
