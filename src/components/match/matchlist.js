import { Container, Row, Col, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './match.scss';
import l1 from '../../assets/logo/1.svg'
import l2 from '../../assets/logo/2.svg'
import l3 from '../../assets/logo/3.svg'
import l4 from '../../assets/logo/4.svg'
import l5 from '../../assets/logo/5.svg'
import l6 from '../../assets/logo/6.svg'
import l7 from '../../assets/logo/7.svg'
import l8 from '../../assets/logo/8.svg'
import l9 from '../../assets/logo/9.svg'
import l10 from '../../assets/logo/10.svg'
import l11 from '../../assets/logo/11.svg'
import l12 from '../../assets/logo/12.svg'
import l13 from '../../assets/logo/13.svg'

const imgLs = [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13]

function IndMatch(props) {
	const entry = props.entry
	console.log(entry)
	return (
		<Link to={"/matches/" + String(entry.match_id)} style={{ textDecoration: "none" }}>
			<div style={{width:"80%",marginLeft:"10%"}}>
				<div className='match-card'>
					<h2>{entry.match_id}</h2>
					<div className='match-details'>
						<div className='team1'>
							<img src={imgLs[entry.team1 -1]}></img>
							<h4 className='team-name'>{entry.team_1}</h4>
						</div>
						<div className='details'>
							{/* <h5 className='venue'>{entry.venue_name}</h5> */}
							<h1 className='versus'> VS </h1>
							<h6 className='venue'>{entry.venue_name},{entry.city_name} </h6>
						</div>
						<div className='team2'>
							<img src={imgLs[entry.team2 -1]}></img>
							<h4 className='team-name'>{entry.team_2}</h4>
						</div>
						<div>
							<h5>{entry.matchwinner} won by {entry.win_margin} {entry.win_type}</h5>
						</div>
					</div>
				</div>
				<p></p>
			</div>
		</Link>
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
