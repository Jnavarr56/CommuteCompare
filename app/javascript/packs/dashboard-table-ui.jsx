import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import TableDashboard from '../components/table/TableDashboard'



document.addEventListener('DOMContentLoaded', () => {
  
  ReactDOM.render(
    <TableDashboard />,
    document.getElementById('table-dashboard-row'),
  )
});

