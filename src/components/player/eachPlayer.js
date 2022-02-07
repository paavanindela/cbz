import React from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import { Mirow, Xrow } from '../player/helper';
import Bowling from './bowling';
import Batting from './batting';

const url = 'http://localhost:5000/players/'
const batheader = ["Player Name", "Matches", "Runs", "Fours", "Sixes", "Fiftys", "Highest Score", "Strike Rate", "Average"]
const bataccess = ["player_name", "matches", "runs", "fours", "sixes", "fifty", "highscore", "sr", "average"]
const bowlheader = ["Player Name", "Matches", "Runs", "Balls", "Overs", "Wickets", "Economy", "Five Wickets"]
const bowlaccess = ["player_name", "matches", "runs", "balls", "overs", "wickets", "economy", "fivewicket"]

function Component(props) {
    const index = props.index;
    const data = props.data;
    // console.log(index);
    // 1 - innings1 2 - innings2 3 - match_info 4 - score comparision 5 - summary
    if (index === 1) {
        return (<div className='ipl-table-wrapper' style={{ width: "100%" }}>
            <div className='table-section'>
                <div>
                    <table className='ipl-table'>
                        <tbody>
                            <tr className='head'>
                                <td colSpan="2">Basic Information</td>
                            </tr>
                            <Mirow name={"PLAYER NAME"} data={data.info.player_name} type="1" />
                            <Mirow name="COUNTRY" data={data.info.country_name} type="1" />
                            <Mirow name="BATTING STYLE" data={data.info.batting_hand} type="1" />
                            <Mirow name="BOWLING STYLE" data={data.info.bowling_skill} type="1" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
    if (index === 2) {
        if (data.hasOwnProperty("battingstats")) {
            return <div className='ipl-table-wrapper' style={{ width: "100%" }}>
                <div className='table-section'>
                    <div>
                        <table className='ipl-table'>
                            <tbody>
                                <Xrow
                                    headers={batheader}
                                    access={bataccess}
                                    data={data.battingstats}></Xrow>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p></p>
                <Batting data={data.battingchart} player_name={data.info.player_name} />
            </div>;
        }
        else {
            return <div className='ipl-table-wrapper' style={{ width: "100%" }}>
                <div className='table-section'>
                    <div>
                        <table className='ipl-table'>
                            <tbody>
                                <Xrow
                                    headers={batheader}
                                    name={data.info.player_name}></Xrow>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p></p>
            </div>;
        }
    }
    if (index === 3) {
        if (data.hasOwnProperty("bowlingstats")) {
            data.bowlingstats.overs = String(Math.floor(data.bowlingstats.overs)) + "." + String(Math.round(6 * data.bowlingstats.overs % 1))
            return <div className='ipl-table-wrapper' style={{ width: "100%" }}>
                <div className='table-section'>
                    <div>
                        <table className='ipl-table'>
                            <tbody>
                                <Xrow
                                    headers={bowlheader}
                                    access={bowlaccess}
                                    data={data.bowlingstats}></Xrow>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p></p>
                <Bowling data={data.bowlingchart} player_name={data.info.player_name} />
            </div>;
        }
        else {
            return <div className='ipl-table-wrapper' style={{ width: "100%" }}>
                <div className='table-section'>
                    <div>
                        <table className='ipl-table'>
                            <tbody>
                                <Xrow
                                    headers={bowlheader}
                                    name={data.info.player_name}></Xrow>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p></p>
            </div>;
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
