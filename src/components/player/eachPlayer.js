import React from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import { Mirow } from '../player/helper';
import Bowling from './bowling';
import Batting from './batting';

const url = 'http://localhost:5000/players/'


function Component(props) {
    const index = props.index;
    const data = props.data;
    // console.log(index);
    // 1 - innings1 2 - innings2 3 - match_info 4 - score comparision 5 - summary
    if (index === 1) {
        return (<div>
            <Container className='container-dark'>
                <h3 className='sub-title'> BASIC INFORMATION</h3>
                <Mirow name={"PLAYER NAME"} data={data.info.player_name} type="1" />
                <Mirow name="COUNTRY" data={data.info.country_name} type="2" />
                <Mirow name="BATTING STYLE" data={data.info.batting_hand} type="1" />
                <Mirow name="BOWLING STYLE" data={data.info.bowling_skill} type="2" />
            </Container>
        </div>);
    }
    if (index === 2) {
        if (data.hasOwnProperty("battingstats")) {
            return (<div>
                 <Container className='container-dark'>
                    <h3 className='sub-title'> BATTING STATISTICS</h3>
                    <Mirow name={"PLAYER NAME"} data={data.battingstats.player_name} type="1" coltype="2" />
                    <Mirow name="MATCHES" data={data.battingstats.matches} type="2" coltype="2" />
                    <Mirow name="RUNS" data={data.battingstats.runs} type="3" coltype="2" />
                    <Mirow name="FOURS" data={data.battingstats.fours} type="1" coltype="2" />
                    <Mirow name="SIXES" data={data.battingstats.sixes} type="2" coltype="2" />
                    <Mirow name="FIFTYS" data={data.battingstats.fifty} type="3" coltype="2" />
                    <Mirow name="HIGHEST SCORE" data={data.battingstats.highscore} type="1" coltype="2" />
                    <Mirow name="STRIKE RATE" data={data.battingstats.sr} type="2" coltype="2" />
                    <Mirow name="AVERAGE" data={data.battingstats.average} type="3" coltype="2" />
                </Container>
                <p></p>
                <Batting data={data.battingchart} player_name={data.info.player_name}/>
            </div>);
        }
        else{
            return <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <p> PLAYER HAS NOT BATTED </p>
                </header>
            </div>
        }
    }
    if (index === 3) {
        if (data.hasOwnProperty("bowlingstats")) {
            return (<div>
                <Container className='container-dark'>
                    <h3 className='sub-title'> BOWLING STATISTICS</h3>
                    <Mirow name={"PLAYER NAME"} data={data.bowlingstats.player_name} type="1" coltype="2" />
                    <Mirow name="MATCHES" data={data.bowlingstats.matches} type="2" coltype="2" />
                    <Mirow name="RUNS" data={data.bowlingstats.runs} type="3" coltype="2" />
                    <Mirow name="BALLS" data={data.bowlingstats.balls} type="1" coltype="2" />
                    <Mirow name="OVERS" data={Math.floor(data.bowlingstats.overs)+"."+Math.round(6*data.bowlingstats.overs%1)} type="2" coltype="2" />
                    <Mirow name="WICKETS" data={data.bowlingstats.wickets} type="3" coltype="2" />
                    <Mirow name="ECONOMY" data={data.bowlingstats.economy} type="1" coltype="2" />
                    <Mirow name="FIFERS" data={data.bowlingstats.fivewicket} type="2" coltype="2" />
                </Container>
                <p></p>
                <Bowling data={data.bowlingchart} player_name={data.info.player_name}/>
            </div>);
        }
        else {
            return <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <p> PLAYER HAS NOT BOWLED </p>
                </header>
            </div>
        }
    }
    return <div></div>;
}

class rPlayer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: null,
            loading: 0,
            playerId: null,
            component: 1,
        };
    }
    componentDidMount() {
        this.setState(
            { playerId: this.props.params.playerId },
            () => { this.getPlayer() }
        )
    }
    changeComponent = (index) => {
        this.setState(
            { component: index },
        )
    }
    getPlayer = () => {
        let r = 0;
        // console.log(this.state.playerId);
        fetch(url + this.state.playerId, {
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
            const data = this.state.data
            return (
                <div className='App'>
                    <header className='title'>
                        PLAYER: {this.state.playerId}
                    </header>
                    <p></p>
                    <ButtonGroup>
                        <Button onClick={() => { this.changeComponent(1) }}>Basic Information</Button>
                        <Button onClick={() => { this.changeComponent(2) }}>Batting Statistics</Button>
                        <Button onClick={() => { this.changeComponent(3) }}>Bowling Statistics</Button>
                    </ButtonGroup>
                    <p></p>
                    <Component index={this.state.component} data={this.state.data} matchId={this.state.matchId} />
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

export const EachPlayer = withRouter(rPlayer);
