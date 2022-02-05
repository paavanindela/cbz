import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import { CreateTable } from './helper';

const url = 'http://localhost:5000/pointstable/'

class rYear extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: null,
            loading: 0,
            YearId: null,
            component: 1,
        };
    }
    componentDidMount() {
        this.setState(
            { YearId: this.props.params.year },
            () => { this.getYear() }
        )
    }
    changeComponent = (index) => {
        this.setState(
            { component: index },
        )
    }
    getYear = () => {
        let r = 0;
        // console.log(this.state.YearId);
        fetch(url + this.state.YearId, {
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
                        Year: {this.state.YearId}
                    </header>
                    <p></p>
                    <CreateTable 
                        headers={["TEAM NAME","MATCHES","WON","LOST","TIED","NRR","POINTS"]}
                        data={data}
                        access={['team_name','matches','wins','lose','tie','netrr','points']} />
                    <p></p>
                    <button className='btn btn-success'>
                        <Link to={"/pointstable"} style={{ textDecoration: "none",color:'inherit'} }>
                            Back
                        </Link>
                    </button>
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

export const EachYear = withRouter(rYear);
