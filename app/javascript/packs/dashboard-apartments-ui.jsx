import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ApartmentDashboard from '../components/apartments/ApartmentDashboard'


document.addEventListener('DOMContentLoaded', () => {
  
  ReactDOM.render(
    <ApartmentDashboard />,
    document.getElementById('dashboard-apartments-row'),
  )
});

