import React from 'react';
import PropTypes from 'prop-types';
import styles from './pointstable.scss';
import { withRouter } from '../withRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet,Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'reactstrap'
const url = 'http://localhost:5000/pointstable/'

function SelectYear(props){
	
	const rowList = props.data.map((val,idx) =>
				<li>
					<a style={{ fontWeight: 'bold'}} href={'http://localhost:3000/pointstable/'+String(val.season_year)}>{val.season_year}</a>
				</li>
		);
	return <Container className='container-dark'>
		<h3 className='sub-title'>
			CHOOSE YEAR
		</h3>
		<ul> 
		{rowList}
		</ul>
	</Container>
}

class PointsTable extends React.Component {
	static navigationOptions = {
		title: 'Selected Item',
		header: null,
	};
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
		};
	}
	componentDidMount() {
		this.getYears()
	}
	componentDidUpdate() {

	}
	getYears = () => {
		let r = 0;
		// console.log(this.state.pageNo);
		fetch(url, {
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
			});
	};
	render() {
		if ("year" in this.props.params)
			return (
				<div>
					<Outlet />
				</div>
			);
		let text = "";
		if (this.state.loading === 0) text = "LOADING";
		else if (this.state.loading === 1) text = "FAILED TO LOAD DATA";
		else return (
			<div className="App">
				<header className='title'>
					PointsTable
				</header>
				<SelectYear data={this.state.data.years} />
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


// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class PointsTable extends React.Component {
//   render() {
//     return <div>This is a component called PointsTable.</div>;
//   }
// }

const PointsTablePropTypes = {
	// always use prop types!
};

PointsTable.propTypes = PointsTablePropTypes;

export const SPointsTable = withRouter(PointsTable);
