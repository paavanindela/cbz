import React from 'react';
import PropTypes from 'prop-types';
import styles from './player.scss';
import { withRouter } from '../withRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, } from 'react-router-dom';

const url = 'http://localhost:5000/players/'

class Player extends React.Component {
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
		const params = {
			page: this.state.pageNo,
		}
		// console.log(this.state.pageNo);
		fetch(url + "20", {
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
	};
	render() {
		if ("playerId" in this.props.params)
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
					PLAYER
				</header>
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
// class player extends React.Component {
//   render() {
//     return <div>This is a component called player.</div>;
//   }
// }

const playerPropTypes = {
	// always use prop types!
};

Player.propTypes = playerPropTypes;

export const Splayer = withRouter(Player);
