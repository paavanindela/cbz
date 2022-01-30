import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from './tablerow';
import { Col, Container, Row } from 'react-bootstrap';

const url = 'http://localhost:5000/matches/summary/'


function ISummary(props) {
	const bdata = props.bdata
	const wdata = props.wdata
	const team = props.team
	const baccess = ['player_name', 'runs', 'balls']
	const waccess = ['player_name', 'wickets', 'runs'] // TODO: ADD OVERS 
	const bbody = bdata.map(entry => {
		return baccess.map(key => entry[key])
	})
	const wbody = wdata.map(entry => {
		return waccess.map(key => entry[key])
	})
	const bplayer_id = bdata.map(entry => {
		return entry.striker
	})
	const wplayer_id = bdata.map(entry => {
		return entry.bowler
	})
	return <Container className="container-dark">
		<Row className="row-dark-2">
			<Col className="col-dark-2">
				{props.team}
			</Col>
		</Row>
		<Row className="row-dark-4">
			<Col className="col-dark">
				<table className='hoverTable'>
					<tbody>
						{bbody.map((row, id) => <TableRow key={id} row={row} type={"1"} id={bplayer_id[id]} />)}
					</tbody>
				</table>
			</Col>
			<Col className="col-dark">
				<table className='hoverTable'>
					<tbody>
						{wbody.map((row, id) => <TableRow key={id} row={row} type={"1"} id={bplayer_id[id]} />)}
					</tbody>
				</table>
			</Col>
		</Row>
	</Container>;
}

class Summary extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
			matchId: 0,
		};
	}
	componentDidMount() {
		// console.log(this.props)
		const pieOptions = {
			title: 'PIE CHART',
			pieHole: 0,
		}
		this.setState(
			{ matchId: this.props.matchId },
			() => { this.getComparision() }
		)
	}
	getComparision = () => {
		let r = 0;
		// console.log(this.state.matchId);
		fetch(url + this.state.matchId, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
		})
			.then(response => {
				if (response.status === 200 || response.status === 304) r = 2;
				else r = 1;
				return response.json();
			})
			.then(rdata => {
				this.setState({
					data: rdata,
					loading: r,
				});
				// console.log(this.state.data)
			});
	}
	render() {
		let text = "";
		if (this.state.loading === 0) text = "LOADING";
		else if (this.state.loading === 1) text = "FAILED TO LOAD DATA";
		else {
			return (
				<div>
					<h6 className="text"> MATCH ID: {this.state.matchId}, IPL, {this.state.data.season_year}</h6>
					<p></p>
					<ISummary
						bdata={this.state.data.batting1}
						wdata={this.state.data.bowling1}
						team={this.state.data.summary.team_name1}// TODO: add overs
					/>
					<p></p>
					<ISummary
						bdata={this.state.data.batting2}
						wdata={this.state.data.bowling2}
						team={this.state.data.summary.team_name2} // TODO: add overs
					/>
					<p></p>
					<h6 className="text"> {this.state.data.summary.matchwinner} WON BY {this.state.data.summary.win_margin} {this.state.data.summary.win_type}</h6>
					{/* <div>
						<Chart
							width={'600px'}
							height={'320px'}
							chartType="PieChart"
							loader={<div>Loading Chart</div>}
							data={pieData}
							options={pieOptions}
							rootProps={{ 'data-testid': '3' }}
						/>
					</div> */}
				</div>
			);
		}
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

const summaryPropTypes = {
	// always use prop types!
};

Summary.propTypes = summaryPropTypes;

export default Summary;