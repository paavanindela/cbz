import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from './helper';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from 'react-google-charts';

const url = 'http://localhost:5000/matches/summary/'

function ISummary(props) {
	const bdata = props.bdata
	const wdata = props.wdata
	const team = props.team
	const baccess = ['player_name', 'runs', 'balls']
	const waccess = ['player_name', 'wickets', 'runs', 'over'] // TODO: ADD OVERS 
	const bbody = bdata.map(entry => {
		return [
			entry.player_name,
			entry.runs +"(" + entry.balls + ")"
		]
	})
	const wbody = wdata.map(entry => {
		return [
			entry.player_name,
			entry.wickets+"-" + entry.runs,
			Math.floor(entry.over)+ "."+Math.round((entry.over % 1) * 6)
		]
	})
	const bplayer_id = bdata.map(entry => {
		return entry.striker
	})
	const wplayer_id = wdata.map(entry => {
		return entry.bowler
	})
	return <Container className="container-dark">
		<Row className="row-dark-2">
			<Col className="col-dark-1">
				{props.team}
			</Col>
			<Col className="col-dark-1" >
				{Math.floor(props.total.over)}.{Math.round((props.total.over % 1) * 6)} Overs
			</Col>
			<Col className="col-dark-1" >
				{props.total.total} / {props.total.wickets}
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
						{wbody.map((row, id) => <TableRow key={id} row={row} type={"1"} id={wplayer_id[id]} />)}
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
			pieData1: null,
			pieData2: null,
		};
	}
	componentDidMount() {
		// console.log(this.props);
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
				const pieData1 = [
					['TYPE', 'RUNS'],
					["ones", Number(rdata.runsChart1.one)],
					["twos", Number(rdata.runsChart1.two)],
					["three", Number(rdata.runsChart1.three)],
					["fours", Number(rdata.runsChart1.four)],
					["fives", Number(rdata.runsChart1.five)],
					["sixes", Number(rdata.runsChart1.six)],
					["extras", Number(rdata.runsChart1.extras)]
				]
				const pieData2 = [
					['TYPE', 'RUNS'],
					["ones", Number(rdata.runsChart2.one)],
					["twos", Number(rdata.runsChart2.two)],
					["three", Number(rdata.runsChart2.three)],
					["fours", Number(rdata.runsChart2.four)],
					["fives", Number(rdata.runsChart2.five)],
					["sixes", Number(rdata.runsChart2.six)],
					["extras", Number(rdata.runsChart2.extras)]
				]
				const pieOptions1 = {
					title: rdata.summary.team_name1,
					pieHole: 0,
				}
				const pieOptions2 = {
					title: rdata.summary.team_name2,
					pieHole: 0,
				}
				this.setState({
					data: rdata,
					loading: r,
					pieData1: pieData1,
					pieData2: pieData2,
					pieOptions1: pieOptions1,
					pieOptions2: pieOptions2
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
						team={this.state.data.summary.team_name1}
						total={this.state.data.total1}// TODO: add overs
					/>
					<p></p>
					<ISummary
						bdata={this.state.data.batting2}
						wdata={this.state.data.bowling2}
						team={this.state.data.summary.team_name2}
						total={this.state.data.total2}// TODO: add overs
					/>
					<p></p>
					<h6 className="text"> {this.state.data.summary.matchwinner} WON BY {this.state.data.summary.win_margin} {this.state.data.summary.win_type}</h6>
					<p></p>
					<div className="lr">
						<Row className='row-dark-4'>
							<Col className='col-dark-1'>
								<Chart
									width={'600px'}
									height={'320px'}
									chartType="PieChart"
									loader={<div>Loading Chart</div>}
									data={this.state.pieData1}
									options={this.state.pieOptions1}
									rootProps={{ 'data-testid': '3' }}
									title={this.state.data.summary.team_1}
								/>
							</Col>
							<Col></Col>
							<Col className='col-dark-1'>
								<Chart
									width={'600px'}
									height={'320px'}
									chartType="PieChart"
									loader={<div>Loading Chart</div>}
									data={this.state.pieData2}
									options={this.state.pieOptions2}
									rootProps={{ 'data-testid': '3' }}
								/>
							</Col>
						</Row>
					</div>
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