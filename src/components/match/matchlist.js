import { Container, Row, Col, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './match.scss';

function IndMatch(props) {
	const entry = props.entry
	// return (
	// 	<Container className='container-dark'>
	// 		<Row className="row-dark-1">
	// 			<Col className="col-dark-1">{entry.team_1} </Col>
	// 			<Col md="auto" className="col-dark-1"> VS</Col>
	// 			<Col className="col-dark-1">{entry.team_2} </Col>
	// 		</Row>
	// 		<Row className="row-dark-2">
	// 			<Col className="col-dark-1">{entry.venue_name} </Col>
	// 			<Col className="col-dark-1">{entry.city_name} </Col>
	// 		</Row>
	// 		<Row className="row-dark-3">
	// 			<Col className="col-dark-2">{entry.matchwinner} won by {entry.win_margin} {entry.win_type}</Col>
	// 			<button variant="primary">
	// 				<Link to={"/matches/" + String(entry.match_id)} style={{textDecoration: "none" }}>
	// 					More Details
	// 				</Link>
	// 			</button>
	// 		</Row>
	// 		<Row className="row-min"></Row>
	// 	</Container>
	// );
	return (
		<div>
			<div className='match-card'>
				<h2>Match Details</h2>
				<div className='match-details'>
					<div className='team1'>
						<img src="logo.svg"></img>
						<h3 className='team-name'>{entry.team_1}</h3>
					</div>
					<div className='details'>
						{/* <h5 className='venue'>{entry.venue_name}</h5> */}
						<h1 className='versus'> VS </h1>
						<h5 className='venue'>{entry.venue_name}</h5 >
					</div>
					<div className='team2'>
						<img src="logo.svg"></img>
						<h3 className='team-name'>{entry.team_2}</h3>
					</div>
					<h4>{entry.matchwinner} won by {entry.win_margin} {entry.win_type}</h4>
				</div>
			</div>
			<p></p>
		</div>
	);
}

export default function MatchList(props) {
	const data = props.data;
	const listItems = data.map((entry, id) =>
		<IndMatch key={id} entry={entry} />
	);
	return (
		<ul>{listItems}</ul>
	);
}
