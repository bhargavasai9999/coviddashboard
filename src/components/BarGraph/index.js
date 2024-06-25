// BarGraph.js

import React from 'react'
import {Bar} from 'react-chartjs-2'

const BarChart = ({data}) => {
  const stateData = data[Object.keys(data)[0]] // Assuming there's only one state data

  const totalActiveCases = Object.keys(stateData.dates).map(date => {
    const {confirmed, recovered, deceased} = stateData.dates[date].delta
    return confirmed - recovered - deceased
  })

  const chartData = {
    labels: Object.keys(stateData.dates),
    datasets: [
      {
        label: 'Total Active Cases',
        data: totalActiveCases,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div style={{marginBottom: '20px'}}>
      <h3>Total Active Cases Bar Graph</h3>
      <Bar data={chartData} />
    </div>
  )
}

export default BarChart
