import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from '../withRouter';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './venues.scss';
const url = 'http://localhost:5000/venue/'

function SelectVenue(props) {
	const index = props.index;
	const rowstyles = ['row-dark-1', 'row-dark-2', 'row-dark-3']
	const rowList = props.data.map((val, idx) =>
		<Link
			to={"/venues/" + String(val.venue_id)}
			style={{
				textDecoration: "none",
			}}
			className="card"
			key={idx}>{val.venue_name}
		</Link>
	);
	// console.log(index);
	if (index === 1) {
		return (<ul
			className='card-list'>
			{rowList}
		</ul>
		);
	}
	return <div></div>;
}

class Venues extends React.Component {
	static navigationOptions = {
		title: 'Selected Item',
		header: null,
	};
	constructor() {
		super(...arguments);
		this.state = {
			data: null,
			loading: 0,
			component: 1,
		};
	}
	componentDidMount() {
		this.getVenues()
	}
	componentDidUpdate() {

	}
	changeComponent(index) {
		this.setState(
			{ component: index }
		)
	}
	getVenues = () => {
		let r = 0;
		const params = {
			page: this.state.pageNo,
		}
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
					data: rdata.data,
					loading: r,
				});
				// console.log(this.state.data)
			});
	};
	render() {
		if ("venueId" in this.props.params)
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
					VENUES
				</header>
				{this.state.component == 1 ?
					(
						<button className="btn btn-success" style={{ marginTop: -20, marginBottom: 10 }}>
							<Link to="/venues/add" 
								style={{color:"inherit"}}>
							Create New Venue
							</Link>
						</button>
					) : <></>
				}
				<SelectVenue index={this.state.component} data={this.state.data} />


				{/* <SelectVenue data={this.state.data}/> */}

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


const VenuesPropTypes = {
	// always use prop types!
};

Venues.propTypes = VenuesPropTypes;

export const SVenues = withRouter(Venues);