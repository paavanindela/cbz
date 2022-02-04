import React from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import Compare from './compare';
import { Mirow, Extatot, CreateTable } from './helper';
import Summary from './summary';

const url = 'http://localhost:5000/matches/'

function Component(props) {
	const index = props.index;
	const data = props.data;
	// console.log(index);
	// 1 - innings1 2 - innings2 3 - match_info 4 - score comparision 5 - summary
	let headers1 = ["Batter", "Runs", "Fours", "Sixes", "Balls_faced"];
	let headers2 = ["Bowler", "Balls Bowled", "Runs Given", "wickets"];
	let access1 = ["player_name", "runs", "fours", "sixes", "balls"];
	let access2 = ["player_name", "balls", "runs", "wickets"];
	if (index === 1) {
		return (<div>
			<h3 className='sub-title'>INNINGS 1 {data.total1.team_name}</h3>
			<CreateTable headers={headers1} data={data.batting1} access={access1} keyname="striker" />
			<Extatot total={data.total1} />
			<CreateTable headers={headers2} data={data.bowling1} access={access2} keyname="bowler" />
		</div>);
	}
	if (index === 2) {
		return (<div>
			<h3 className='sub-title'>INNINGS 2 {data.total2.team_name}</h3>
			<CreateTable headers={headers1} data={data.batting2} access={access1} keyname="striker" />
			<Extatot total={data.total2} />
			<CreateTable headers={headers2} data={data.bowling2} access={access2} keyname="bowler" />
		</div>);
	}
	if (index === 3) {
		return (<div>
			<h3 className='sub-title'>MATCH INFO</h3>
			<p></p>
			<Container>
				<Mirow name={"MATCH: " + data.info.id} data={data.info.team_1 + "  VS " + data.info.team_2 + "\n" + " in " + data.info.season_year} type="1" />
				<Mirow name="TOSS" data={data.info.tosswinner + " elected to " + data.info.toss_name + " first"} type="2" />
				<Mirow name="VENUE" data={data.info.venue_name} type="3" />
				<Mirow name="UMPIRES" data={" " + data.umpires.map(item => item.umpire_name)} type="1" />
				<Mirow name={data.info.team_1 + "'s Playing XI"} data={" " + data.playingXI.map(item => {
					let str1 = "", str2 = ""
					if (item.role_desc1 === "Captain" || item.role_desc1 === "CaptainKeeper") str1 = "(c)"
					if (item.role_desc1 === "Keeper" || item.role_desc1 === "CaptainKeeper") str2 = "(wk)"
					return item.player_name1 + str1 + str2;
				})} type="2" />
				<Mirow name={data.info.team_2 + "'s Playing XI"} data={" " + data.playingXI.map(item => {
					let str1 = "", str2 = ""
					if (item.role_desc2 === "Captain" || item.role_desc2 === "CaptainKeeper") str1 = "(c)"
					if (item.role_desc2 === "Keeper" || item.role_desc2 === "CaptainKeeper") str2 = "(wk)"
					return item.player_name2 + str1 + str2;
				})} type="3" />
			</Container>
		</div>);
	}
	if (index === 4) {
		return (<div>
			<h3 className='sub-title'>SCORE COMPARISION</h3>
			<p></p>
			<Compare matchId={props.matchId} />
		</div>);
	}
	if (index === 5) {
		return (<div>
			<h3 className='sub-title'>SUMMARY</h3>
			<Summary matchId={props.matchId} />
			<p></p>
		</div>);
	}
	return <div></div>;
}
class rMatch extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
			matchId: null,
			component: 3,
		};
	}
	componentDidMount() {
		this.setState(
			{ matchId: this.props.params.matchId },
			() => { this.getMatch() }
		)
	}
	changeComponent = (index) => {
		this.setState(
			{ component: index },
		)
	}
	getMatch = () => {
		let r = 0;
		const params = {
			page: this.state.pageNo,
		}
		// console.log(this.state.pageNo);
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
		else return (
			<div className='App'>
				{/* <header className='title'>
					Match: {this.state.matchId}
				</header> */}
				<ButtonGroup>
					<DropdownButton as={ButtonGroup} title="Scorecard" id="bg-nested-dropdown">
						<Dropdown.Item eventKey="innings1" onClick={() => { this.changeComponent(1) }}>INNINGS 1</Dropdown.Item>
						<Dropdown.Item eventKey="innings2" onClick={() => { this.changeComponent(2) }}>INNINGS 2</Dropdown.Item>
						<Dropdown.Item eventKey="innings2" onClick={() => { this.changeComponent(3) }}>MATCH INFO</Dropdown.Item>
					</DropdownButton>
					<Button onClick={() => { this.changeComponent(4) }}>Score Comparison</Button>
					<Button onClick={() => { this.changeComponent(5) }}>Summary</Button>
				</ButtonGroup>
				<Component index={this.state.component} data={this.state.data} matchId={this.state.matchId} />
				<p></p>
				<Button variant="warning">
					<Link to={"/matches"} style={{ textDecoration: "none" }}>
						Back
					</Link>
				</Button>
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

export const EachMatch = withRouter(rMatch);
