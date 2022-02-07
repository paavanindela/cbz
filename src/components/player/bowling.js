import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './player.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import { Col, Container, Row } from 'react-bootstrap';

function Bowling(props) {
    const data = props.data
    const player_name = props.player_name
    var options = {
        chart: { height: 350, type: 'line', stacked: false },
        dataLabels: { enabled: true },
        stroke: { width: [5, 4] },
        title: { text: player_name + "'s Bowling Skills", align: 'left', offsetX: 110 },
        xaxis: {
            categories: data.map(val => val.match_id),
        },
        yaxis: [
            {
                axisTicks: { show: true, },
                axisBorder: { show: true, color: '#000000' },
                labels: { style: { colors: '#0000FF', } },
                title: { text: "Runs", style: { color: '#FF0000', } },
                tooltip: { enabled: true },
                min: 0,
            },
            {
                seriesName: 'Wickets', opposite: true,
                axisTicks: { show: true, },
                axisBorder: { show: true, color: '#000000' },
                labels: { style: { colors: '#0000FF', }, },
                title: { text: "Wickets", style: { color: '#FF0000', } },
                min: -1,
                max:7
            },
        ],
        tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 }, },
        legend: { horizontalAlign: 'left', offsetX: 40 },
        plotOptions: {
            bar: {
                columnWidth: '10px',
            }
        }
    };
    var series = [
        {
            name: 'Runs',
            type: 'column',
            data: data.map(val => val.runs),
        },
        {
            name: 'Wickets',
            type: 'line',
            data: data.map(val => val.wickets),
        },
    ]
    // console.log(plotData)
    return <Container className='container-dark-1'><Chart options={options}
        series={series} /></Container>;
}

export default Bowling;