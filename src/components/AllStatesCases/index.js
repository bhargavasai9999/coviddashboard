import {useState} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import IndianState from '../IndianState'
import './index.css'

const AllStatesCases = props => {
  const {covidData, statesList} = props

  // Initialize state to hold the data
  const [statesData, setStatesData] = useState(() =>
    statesList.map(eachState => ({
      stateName: eachState.state_name,
      stateCode: eachState.state_code,
      confirmed: covidData[eachState.state_code]?.total.confirmed || 0,
      recovered: covidData[eachState.state_code]?.total.recovered || 0,
      deceased: covidData[eachState.state_code]?.total.deceased || 0,
      other: covidData[eachState.state_code]?.total.other || 0,
      population: covidData[eachState.state_code]?.meta.population || 0,
    })),
  )

  // Function to handle ascending sorting
  const onClickSortingAsc = () => {
    const ascendingSortedStatesData = [...statesData].sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
    )
    setStatesData(ascendingSortedStatesData)
  }

  // Function to handle descending sorting
  const onClickSortingDesc = () => {
    const descendingSortedStatesData = [...statesData].sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )
    setStatesData(descendingSortedStatesData)
  }

  return (
    <div className="stats-table" testid="stateWiseCovidDataTable">
      <div className="table-header">
        <div className="states-name-column">
          <p className="table-header-title">States/UT</p>
          <div className="icons-container">
            <button
              type="button"
              className="sorting-icon"
              onClick={onClickSortingAsc}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc size="20" />
            </button>
            <button
              type="button"
              className="sorting-icon"
              onClick={onClickSortingDesc}
              testid="descendingSort"
            >
              <FcGenericSortingDesc size="20" />
            </button>
          </div>
        </div>
        <div className="table-column">
          <p className="table-header-title">Confirmed</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Active</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Recovered</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Deceased</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Population</p>
        </div>
      </div>
      <hr className="line" />
      <ul className="state-stats-container">
        {statesData.map(state => (
          <IndianState key={state.stateCode} state={state} />
        ))}
      </ul>
    </div>
  )
}

export default AllStatesCases
