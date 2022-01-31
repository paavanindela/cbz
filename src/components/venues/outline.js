import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './venues';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from './helper';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from 'react-google-charts';

function Outline(props) {
    console.log(props)
    const pieOptions = {
        title: "OUTLINE OF MATCHES",
        pieHole: 0.4,
    };
    const pieData = [
        ['WIN-TYPE', 'NUMBER'],
        ["Team batting First Victories", Number(props.data.battingwin)],
        ["Team bowling First Victories", Number(props.data.bowlingwin)],
        ["Draw", Number(props.data.draw)],
    ];
    if(props.data.matches > 0)
    return (
        <Container className='container-dark'>
            <div className='row-dark-1'>
                <Col></Col>
                <Chart 
                    height="500px"
                    width="500px"
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={pieData}
                    options={pieOptions}
                    title={"OUTLINE"}
                />
                <Col></Col>
            </div>
        </Container>
    );
    return <h2>No Data</h2>
}

export default Outline