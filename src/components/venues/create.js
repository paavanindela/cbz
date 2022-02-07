import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';

const url = 'http://localhost:5000/venue/'

class rCreate extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            name: "",
            city: "",
            country: "",
            capacity: undefined,
        };
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    componentDidMount() {

    }
    onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            }).then(response =>{
                if(response.status===200){

                    return response.json()
                    
                }
                else{
                    alert("venue not added" );
                }
            }).then(rdata =>{
                if(rdata.success){
                    alert("venue " + this.state.name + " added succesfully" );
                        this.setState({
                            name:'',
                            city:'',
                            capacity:'',
                            country:''
                        })
                }
                else {
                    alert(rdata.error)
                }
            });
            
        }
        catch (err) {
            console.error(err.message)
        }
    }
    render() {
        return (
            <div className='App'>
                <div className='title'>
                    Add New Venue
                </div>
                <Fragment>
                    <div className="box" align="center">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="input-container">
                                <input required type="text" value={this.state.name} onChange={e => this.setState({
                                    name: e.target.value
                                })} />
                                <label>Venue Name</label>
                            </div><div className="input-container">
                                <input required type="text" value={this.state.city} onChange={e => this.setState({
                                    city: e.target.value
                                })} />
                                <label>City Name</label>
                            </div><div className="input-container">
                                <input required type="text" value={this.state.country} onChange={e => this.setState({
                                    country: e.target.value
                                })} />
                                <label>Country Name</label>
                            </div><div className="input-container">
                                <input required type="number" value={this.state.capacity} onChange={e => this.setState({
                                    capacity: e.target.value
                                })} />
                                <label>Capacity</label>
                            </div>
                            <button className='btn btn-success' type='submit'>
                                Add
                            </button>
                            <button className='btn btn-success' style={{ marginLeft: 10 }}>
                                <Link to="/venues"
                                    style={{ color: "inherit" }}>
                                    Back
                                </Link>
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        )
    }
}

export const Create = withRouter(rCreate);