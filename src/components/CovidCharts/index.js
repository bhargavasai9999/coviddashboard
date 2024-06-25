import React, {Component} from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import LoaderSpinner from '../LoaderSpinner'
import './index.css'

class CovidCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {stateId} = this.props
    const options = {
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateId}`

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      this.setState({
        data: result,
        loading: false,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({loading: false})
    }
  }

  render() {
    const {loading, data} = this.state

    if (loading) {
      return (
        <div testid="timelinesDataLoader">
          <LoaderSpinner />
        </div>
      )
    }

    const datesData = Object.entries(data[this.props.stateId]?.dates).map(
      ([date, dataObj]) => ({
        date,
        ...dataObj.total,
      }),
    )

    const dailyTotalCasesData = datesData.map(entry => ({
      date: entry.date,
      totalCases: entry.confirmed + entry.recovered + entry.deceased,
    }))

    return (
      <div className="covid-charts-container">
        <div className="chart-wrapper">
          <h2>Daily Total Cases</h2>
          <div className="chart-background">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyTotalCasesData.slice(0, 10)}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalCases" fill="#de0909" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2>Confirmed Cases</h2>
          <div className="chart-background confirmed-hover">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datesData}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="confirmed" stroke="#ff073a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2>Deceased Cases</h2>
          <div className="chart-background deceased-hover">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datesData}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="deceased" stroke="#6c757d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2>Recovered Cases</h2>
          <div className="chart-background recovered-hover">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datesData}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="recovered" stroke="#28a745" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2>Tested Cases</h2>
          <div className="chart-background tested-hover">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datesData}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tested" stroke="#94a3b8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2>Vaccinated Dose 1</h2>
          <div className="chart-background vaccinated1-hover">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datesData}>
                <XAxis dataKey="date" tickCount={4} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vaccinated1" stroke="#0ea5e9" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default CovidCharts
