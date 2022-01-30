import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './player.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import { Col, Container, Row } from 'react-bootstrap';

function Batting(props) {
    const data = props.data
    const player_name = props.player_name
    var options = {
        chart: { height: 350, type: 'line', stacked: false },
        dataLabels: { enabled: false },
        stroke: { width: [1] },
        title: { text: player_name + "'s Batting Skills", align: 'left', offsetX: 110 },
        xaxis: {
            categories: data.map(val => val.match_id),
        },
        yaxis: [
            {
                axisTicks: { show: true, },
                axisBorder: { show: true, color: '#000000' },
                labels: { style: { colors: '#FF0000', } },
                title: { text: "Runs", style: { color: '#FF0000', } },
                tooltip: { enabled: true },
                min: 0,
            },
        ],
        tooltip: { fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 }, },
        legend: { horizontalAlign: 'left', offsetX: 40 },
        colors: [
            function({ value, seriesIndex, w }) {
              if (value < 20) {
                return '#FF0000'
              } else if( value >50){
                return '#0000FF'
              } else if( value < 50 && value >=30){
                return '#00FF00'
              } else {
                return '#FFFF00'
              }
            }
          ],
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
        }        // add running average
    ]
    // console.log(plotData)
    return <Container className='container-dark-2'><Chart options={options}
        series={series} /></Container>;
}

export default Batting;