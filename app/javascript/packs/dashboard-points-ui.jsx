import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PointsDashboard from '../components/points/PointsDashboard'


document.addEventListener('DOMContentLoaded', () => {
  
  ReactDOM.render(
    <PointsDashboard />,
    document.getElementById('dashboard-points-row'),
  )
});

