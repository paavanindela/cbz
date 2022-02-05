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
	const bbody = bdata.map(entry => {
		return [
			entry.player_name,
			entry.runs,
			entry.balls
		]
	})
	const wbody = wdata.map(entry => {
		return [
			entry.player_name,
			entry.wickets + "-" + entry.runs,
			Math.floor(entry.over) + "." + Math.round((entry.over % 1) * 6)
		]
	})
	const bplayer_id = bdata.map(entry => {
		return entry.striker
	})
	const wplayer_id = wdata.map(entry => {
		return entry.bowler
	})
	return <div>
		<div className='table-title'>
			{props.team}
		</div>
		<table className='ipl-table'>
			<thead>
				<tr className='head'>
					<th colSpan="3">{props.total.total}-{props.total.wickets}</th>
				</tr>
			</thead>
			<tbody>
				{bbody.map((row, id) => <TableRow key={id} row={row} type={"1"} id={bplayer_id[id]} />)}
				<tr className='head'>
					<td colSpan="3">{Math.floor(props.total.over)}.{Math.round((props.total.over % 1) * 6)} Overs</td>
				</tr>
				{wbody.map((row, id) => <TableRow key={id} row={row} type={"1"} id={wplayer_id[id]} />)}
			</tbody>
		</table>
	</div>;

	// source: https://codingshiksha.com/javascript/build-a-world-cup-2019-live-cricket-score-dashboard-in-html5-and-css3-in-browser-full-project-for-beginners/
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
					{/* <div className='container-dark'> */}
					<div className='ipl-table-wrapper'>
						<div class="footer-section">
							<div class="ipl-table-footer">
								MATCH ID: {this.state.matchId}, IPL, {this.state.data.season_year}
							</div>
						</div>
						<div className='table-section'>
							<ISummary
								bdata={this.state.data.batting1}
								wdata={this.state.data.bowling1}
								team={this.state.data.summary.team_name1}
								total={this.state.data.total1}// TODO: add overs
							/>
							<ISummary
								bdata={this.state.data.batting2}
								wdata={this.state.data.bowling2}
								team={this.state.data.summary.team_name2}
								total={this.state.data.total2}// TODO: add overs
							/>
						</div>
						<div class="footer-section">
							<div class="ipl-table-footer">
								{this.state.data.summary.matchwinner} won by {this.state.data.summary.win_margin} {this.state.data.summary.win_type}
							</div>
						</div>
					</div>
					{/* </div> */}
					<Container className='container-dark'>
						<div className='match-card row-dark-1'>
							<Col></Col>
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
							<Col></Col>
						</div>
					</Container>
					<p></p>
					<Container className='container-dark'>
						<div className='match-card row-dark-1'>
							<Col></Col>
							<Chart
								width={'600px'}
								height={'320px'}
								chartType="PieChart"
								loader={<div>Loading Chart</div>}
								data={this.state.pieData2}
								options={this.state.pieOptions2}
								rootProps={{ 'data-testid': '3' }}
							/>
							<Col></Col>
						</div>
					</Container>
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