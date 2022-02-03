import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import { data, isNumeric } from 'jquery';
import { Container } from 'react-bootstrap';

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
		const LineChartOptions = {
			hAxis: { title: 'OVERS', },
			vAxis: { title: 'RUNS', },
			series: { 1: { curveType: 'function' }, },
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
			const data = this.state.data;
			var list = [];
			for (var i = 1; i <= 120; i++) {
				list.push(i * 1.0 / 6);
			}
			var options = {
				chart: { height: 350, type: 'line', stacked: false },
				dataLabels: { enabled: true },
				stroke: { width: [5, 5] },
				title: { text: "Innings comparison", align: 'middle', style: { fontSize: '22px', color: '#a30 ' } },
				xaxis: {
					title: {
						text: 'OVERS'
					},
					categories: list,
					type: 'numeric',
					tickAmount: 21,
					max: 21,
					min: 0,

					labels: {
						formatter: function (value) {
							return Math.floor(value) + 0.1 * Math.round(6 * (value % 1));
						}
					}
				},

				yaxis: {

					axisTicks: { show: true, },
					axisBorder: { show: true, color: '#000000' },
					labels: { style: { colors: '#0000FF', }, },
					title: { text: "RUNS" },
					min: 0,
				},
				dataLabels: {
					enabled: false
				},
				annotations: {
					points:
						data.inning1.map(val => {
							if (val.wickets > 0)
								return {
									x: (val.ball_no * 1.0) / 6,
									y: val.cumruns,
									marker: {
										size: 4,
										fillColor: '#fff',
										strokeColor: 'red',
										radius: 2,
										cssClass: 'apexcharts-custom-class'
									},
								}
						}).concat(
							data.inning2.map(val => {
								if (val.wickets > 0)
									return {
										x: (val.ball_no * 1.0) / 6,
										y: val.cumruns,
										marker: {
											size: 4,
											fillColor: '#fff',
											strokeColor: 'blue',
											radius: 2,
											cssClass: 'apexcharts-custom-class'
										},
									}
							})
						)

				},

				tooltip: {
					fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 },
					// custom: 
					// 	 function({series, seriesIndex, dataPointIndex, w}) {
					// 	  return(
					// 	  '<div> '+  w.globals.labels[dataPointIndex] +'</div>' + 	   
					// 	  '<div class="arrow_box">' +
					// 		'<span> 1: ' + series[0][dataPointIndex] + '</span>' +
					// 		'</div>' +
					// 		'<div class="arrow_box">' +
					// 		'<span> 2: ' + series[1][dataPointIndex] + '</span>' +
					// 		'</div>' 
					// 	  )
					// 	}

				},
				legend: {
					position: 'top', horizontalAlign: 'left', offsetX: 40
					, fontSize: '18px',
				},

				//   plotOptions: {
				// 	line: {
				// 		columnWidth: '10px',
				// 	}
				// 	line: {

				// 	}
				// }
			};
			var series = [
				{
					name: "1 - " + data.summary.team_name1,
					type: 'line',
					data: data.inning1.map(val => val.cumruns),
				},
				{
					name: "2 - " + data.summary.team_name2,
					type: 'line',
					data: data.inning2.map(val => val.cumruns),
				},       // add running average
			]
			return (
				<div >
					<Container className='container-dark-2'><Chart options={options}
						series={series} /></Container>
					<div className='ipl-table-wrapper'>
						<div class="footer-section">
							<div class="ipl-table-footer">
								{this.state.data.summary.matchwinner} won by {this.state.data.summary.win_margin} {this.state.data.summary.win_type}
							</div>
						</div>
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

const comparePropTypes = {
	// always use prop types!
};

Compare.propTypes = comparePropTypes;

export default Compare;