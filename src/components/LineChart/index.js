// LineChart.js

import React from 'react'
import {Line} from 'react-chartjs-2'

const LineChart = ({data, category}) => {
  const dates = Object.keys(data)

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: category,
        data: dates.map(date => data[date][category]),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div style={{marginBottom: '20px'}}>
      <h3>{category} Chart</h3>
      <Line data={chartData} />
    </div>
  )
}

export default LineChart
