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
    stroke: { width: [1,1,1,1] },
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
    tooltip: { 
      fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 },
      enabledOnSeries: [4],
    },
    legend: { horizontalAlign: 'left', offsetX: 40 },
    plotOptions: {
      bar: {
        columnWidth: '10px',
      }
    },
    colors:['#FF0000', '#00FF00', '#0000FF','#FFFFFF','#000000']
  };
  var series = [
    {
      name: 'Less Than Thirty',
      type: 'column',
      data: data.map(val => {
        if (val.runs < 30) return val.runs;
        return null;
      }),
    },
    {
      name: 'Thirties',
      type: 'column',
      data: data.map(val => {
        if (val.runs >= 30 && val.runs < 50) return val.runs;
        return null;
      }),
    },
    {
      name: 'Fifties',
      type: 'column',
      data: data.map(val => {
        if (val.runs >= 50 && val.runs<100) return val.runs;
        return null;
      }),
    },
    {
      name: 'Centuries',
      type: 'column',
      data: data.map(val => {
        if (val.runs >= 100) return val.runs;
        return null;
      }),
    },
    {
      name: 'Runs',
      type: 'line',
      data: data.map(val => {
        return val.runs;
      }),
    }      // add running average
  ]
  // console.log(plotData)
  return <Container className='container-dark-1'><Chart options={options}
    series={series} /></Container>;
}

export default Batting;