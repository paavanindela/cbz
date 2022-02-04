import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './venues';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from './helper';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from 'react-google-charts';

function FiScore(props) {
    const options = {
        title: 'First Innings Average Score',
        vAxis: { title: "Runs",minValue: 0},
        hAxis: { title:"Season year"},
        legend: { position: 'bottom' }
    };
    const lineData = [
        ['season_year', 'runs'],
    ].concat(
        props.graph.map(val => [
            Number(val.season_year), Number(val.score)
        ])
    );

    if (props.graph.length > 0){
    return (
        
        <Container className='container-dark'>
            <div className='match-card row-dark-1'>
                <Col></Col>
                <Chart 
                    height="500px"
                    width="900px"
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={lineData}
                    options={options}
                    title={"Average First Innings Score"}
                />
                <Col></Col>
            </div>
        </Container>
        ); 
    }
    return(
        <h2>No Data </h2>
    )
}

export default FiScore