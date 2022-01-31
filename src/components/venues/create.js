import {React, Fragment, useState, useEffect} from 'react';
import { Container, ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';

const url = 'http://localhost:5000/venue/'



const Create = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [capacity, setCapacity] = useState(undefined);
    const onSubmitForm  = async e => {
        e.preventDefault();
        try{
            const body = {name, city, country, capacity};
            console.log(body)
            const response = await fetch(url,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)

            });
            if(response.status==200){
                alert("venue " + name + " added succesfully" );
                setName("");
                setCity("");
                setCountry("");
                setCapacity("");
            }
            else{
                alert("venue not added" );
            }
        }
        catch(err){
            console.error(err.message)
        }
    } 
    function refresh(){
        window.location.reload(false);
    }
    
    return (
        <Fragment>
            <div className="box" align="center">
            <form onSubmit={onSubmitForm}>
                <div className="input-container">
                <input required type="text"  value={name} onChange={e => setName(e.target.value)}/>
                <label>Venue Name</label>
                </div><div className="input-container">
                <input required type="text"  value={city} onChange={e => setCity(e.target.value)}/>
                <label>City Name</label>
                </div><div className="input-container">
                <input required type="text"  value={country} onChange={e => setCountry(e.target.value)}/>
                <label>Country Name</label>
                </div><div className="input-container">
                <input required type="number"  value={capacity} onChange={e => setCapacity(e.target.value)}/>
                <label>Capacity</label>
                </div>
                <button className='btn btn-success' type='submit' >Add</button>       
                <button className='btn btn-success' style={{marginLeft: 10}} onClick={refresh}>Back</button>    
            </form>
            </div>
            
            
        </Fragment>
    )
}



export default Create