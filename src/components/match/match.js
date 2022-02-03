import React from 'react';
import { ButtonGroup,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, } from 'react-router-dom';
import { withRouter } from '../withRouter';
import MatchList from './matchlist';
import bg from '../../assets/bg.jpg'

const url = 'http://localhost:5000/matches/'

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
				if (response.status === 200 || response.status === 304) r = 2;
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
		if ("matchId" in this.props.params)
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
					MATCHES
				</header>
				<MatchList data={this.state.data} />
				<p></p>
				<ButtonGroup size="lg" className="mb-2" >
					<Button onClick={() => this.getNext(-1)} variant="danger">
						PREV
					</Button>
					<Button onClick={() => this.getNext(1)} variant="success">
						NEXT
					</Button>
				</ButtonGroup>
				<Outlet />
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

export const Smatch = withRouter(Match);