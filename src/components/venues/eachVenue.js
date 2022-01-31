import React from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import { Mirow } from './helper';
import Outline from './outline';
import FiScore from './fiScore';

const url = 'http://localhost:5000/venue/'

function Component(props) {
	const index = props.index;
	const data = props.data;
	// console.log(index);
	// 1 - basic 2 - outline 3 - F avg
	if (index === 1) {
		return (<div>
            <Container className='container-dark'>
                <h3 className='sub-title'> BASIC INFORMATION</h3>
                <Mirow name={"VENUE NAME"} data={data.venue_name} type="1" />
                <Mirow name="ADDRESS" data={data.city_name + "," + data.country_name} type="2" />
                <Mirow name="CAPACITY" data={data.capacity} type="3" />
                <Mirow name="TOTAL MATCHES PLAYED" data={data.matches} type="1" />
                <Mirow name="HIGHEST SCORE RECORDED" data={data.highest} type="2" />
                <Mirow name="LOWEST SCORE RECORDED" data={data.lowest} type="3" />
                <Mirow name="HIGHEST SCORE CHASED" data={data.max} type="1" />
            </Container>
		</div>);
	}
	if (index === 2) {
		return (<div>
			<Outline data={data}/>
		</div>);
	}
	if (index === 3) {
		return (<div>
			<FiScore graph={props.graph}/>
		</div>);
	}
	return <div></div>;
}

class rvenue extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: null,
            graph: null,
            loading: 0,
            venueId: null,
            component: 1,
        };
    }
    componentDidMount() {
        this.setState(
            { venueId: this.props.params.venueId },
            () => { this.getVenue() }
        )
    }
    changeComponent = (index) => {
        this.setState(
            { component: index },
        )
    }
    getVenue = () => {
        let r = 0;
        // console.log(this.state.venueId);
        fetch(url + this.state.venueId, {
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
                    graph: rdata.graph,
                    loading: r,
                });
            });
    }
    changeComponent = (index) => {
        this.setState(
            { component: index },
        )
    }
    render() {
        let text = "";
        if (this.state.loading === 0) text = "LOADING";
        else if (this.state.loading === 1) text = "FAILED TO LOAD DATA";
        else {
            const data = this.state.data
            return (
                <div className='App'>
                    <header className='title'>
                        VENUE: {this.state.venueId}
                    </header>
                    <ButtonGroup>
                        <Button onClick={() => { this.changeComponent(1) }}>Basic Information</Button>
                        <Button onClick={() => { this.changeComponent(2) }}>Matches Outline</Button>
                        <Button onClick={() => { this.changeComponent(3) }}>First Innings Average </Button>
                    </ButtonGroup>
                    <p></p>
                    <Component index={this.state.component} data={this.state.data} graph={this.state.graph} />
                    <p></p>
                    <Button variant="warning">
                        <Link to={"/venues"} style={{ textDecoration: "none" }}>
                            Back
                        </Link>
                    </Button>
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

export const EachVenue = withRouter(rvenue);
