import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts';


const url = 'http://localhost:5000/matches/comparison/'

class Compare extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
		};
	}
	componentDidMount() {
		// console.log(this.props)
		const LineChartOptions = { hAxis: { title: 'OVERS',},
				 vAxis: { title: 'RUNS',}, 
				 series: { 1: { curveType: 'function' },},
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
			const LineData = [
				['x',this.state.data.summary.team_name1,this.state.data.summary.team_name2],
                [0,0,0]
			]
			
			return (
				<div >
					<Chart 
						chartType='LineChart'
						loader={<div>LOADING CHART</div>}
						data={LineData}
						options={this.LineChartOptions}
						rootProps={{ 'data-testid': '2' }}
					/>
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

const comparePropTypes = {
	// always use prop types!
};

Compare.propTypes = comparePropTypes;

export default Compare;