import {Component} from 'react'
import './index.css'
import LoaderSpinner from '../LoaderSpinner'
import CovidCharts from '../CovidCharts'
import Header from '../Header'
import Footer from '../Footer'

const statesList = [
  {state_code: 'AN', state_name: 'Andaman and Nicobar Islands'},
  {state_code: 'AP', state_name: 'Andhra Pradesh'},
  {state_code: 'AR', state_name: 'Arunachal Pradesh'},
  {state_code: 'AS', state_name: 'Assam'},
  {state_code: 'BR', state_name: 'Bihar'},
  {state_code: 'CH', state_name: 'Chandigarh'},
  {state_code: 'CT', state_name: 'Chhattisgarh'},
  {state_code: 'DN', state_name: 'Dadra and Nagar Haveli and Daman and Diu'},
  {state_code: 'DL', state_name: 'Delhi'},
  {state_code: 'GA', state_name: 'Goa'},
  {state_code: 'GJ', state_name: 'Gujarat'},
  {state_code: 'HR', state_name: 'Haryana'},
  {state_code: 'HP', state_name: 'Himachal Pradesh'},
  {state_code: 'JK', state_name: 'Jammu and Kashmir'},
  {state_code: 'JH', state_name: 'Jharkhand'},
  {state_code: 'KA', state_name: 'Karnataka'},
  {state_code: 'KL', state_name: 'Kerala'},
  {state_code: 'LA', state_name: 'Ladakh'},
  {state_code: 'LD', state_name: 'Lakshadweep'},
  {state_code: 'MH', state_name: 'Maharashtra'},
  {state_code: 'MP', state_name: 'Madhya Pradesh'},
  {state_code: 'MN', state_name: 'Manipur'},
  {state_code: 'ML', state_name: 'Meghalaya'},
  {state_code: 'MZ', state_name: 'Mizoram'},
  {state_code: 'NL', state_name: 'Nagaland'},
  {state_code: 'OR', state_name: 'Odisha'},
  {state_code: 'PY', state_name: 'Puducherry'},
  {state_code: 'PB', state_name: 'Punjab'},
  {state_code: 'RJ', state_name: 'Rajasthan'},
  {state_code: 'SK', state_name: 'Sikkim'},
  {state_code: 'TN', state_name: 'Tamil Nadu'},
  {state_code: 'TG', state_name: 'Telangana'},
  {state_code: 'TR', state_name: 'Tripura'},
  {state_code: 'UP', state_name: 'Uttar Pradesh'},
  {state_code: 'UT', state_name: 'Uttarakhand'},
  {state_code: 'WB', state_name: 'West Bengal'},
]

class EachStateCovidDetails extends Component {
  state = {
    statesData: {},
    isLoading: true,
    eachstatecovidtests: [],
    eachstateconfirmedcases: [],
    eachstateactivecases: [],
    eachstaterecoveredcases: [],
    eachstatedeceasedcases: [],
    eachstatedistrictcases: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const stateData = data[id]
    const eachStateTests = stateData.total.tested
    const eachStateConfirmedCases = stateData.total.confirmed
    const eachStateRecoveredCases = stateData.total.recovered
    const eachStateDeceasedCases = stateData.total.deceased
    const eachStateActiveCases =
      eachStateConfirmedCases - eachStateRecoveredCases - eachStateDeceasedCases

    this.setState({
      statesData: stateData,
      isLoading: false,
      eachstatecovidtests: eachStateTests,
      eachstateconfirmedcases: eachStateConfirmedCases,
      eachstaterecoveredcases: eachStateRecoveredCases,
      eachstatedeceasedcases: eachStateDeceasedCases,
      eachstateactivecases: eachStateActiveCases,
    })

    const {statesData} = this.state
    const districtDetailsList = []
    const districtsList = statesData.districts
    Object.entries(districtsList).forEach(eachDistrict => {
      if (eachDistrict[1].total.confirmed !== undefined) {
        districtDetailsList.push([
          eachDistrict[0],
          eachDistrict[1].total.confirmed,
        ])
      }
    })

    const sorted = districtDetailsList.sort((a, b) => a[1] - b[1])
    const descSorted = sorted.reverse()
    this.setState({eachstatedistrictcases: descSorted})
  }

  getStateName = id => {
    const statesName = statesList.find(each => each.state_code === id)
    return statesName.state_name
  }

  getTheDate = () => {
    const {isLoading, statesData} = this.state
    let updatedDate
    if (isLoading !== true) {
      const a = new Date(statesData.meta.last_updated)
      updatedDate = a.toString().slice(0, 15)
    }
    return updatedDate
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const numberFormat = new Intl.NumberFormat()
    const updatedDate = this.getTheDate()
    const {
      isLoading,
      eachstatecovidtests,
      eachstateconfirmedcases,
      eachstaterecoveredcases,
      eachstatedeceasedcases,
      eachstateactivecases,
      eachstatedistrictcases,
    } = this.state

    return (
      <>
        <Header />
        {isLoading ? (
          <div testid="stateDetailsLoader">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="content" testid="">
            <div className="statedetails-container">
              <div>
                <h1 className="statename-heading">
                  {this.getStateName(id)}
                  <br />
                  {numberFormat.format(eachstateconfirmedcases)}
                </h1>
                <p className="date-description">{`Last Updated on ${updatedDate}`}</p>
              </div>
              <div>
                <p className="tested-description">Tested</p>
                <p className="each-state-tests">
                  {numberFormat.format(eachstatecovidtests)}
                </p>
              </div>
            </div>

            <div className="each-state-cases-container">
              <div
                className="cases-container confirmed-hover"
                testid="stateSpecificConfirmedCasesContainer"
              >
                <h1 className="state-confirmed-heading">Confirmed</h1>
                <img
                  src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1628572637/check-mark_1_2_wjyqu2.png"
                  className="state-confirmed-icon"
                  alt="state specific confirmed cases pic"
                />
                <p className="state-confirmed-cases-des">
                  {numberFormat.format(eachstateconfirmedcases)}
                </p>
              </div>

              <div
                className="cases-container active-hover"
                testid="stateSpecificActiveCasesContainer"
              >
                <h1 className="state-active-heading">Active</h1>
                <img
                  src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1628572504/protection_1_1_fr0rgh.png"
                  className="state-confirmed-icon"
                  alt="state specific active cases pic"
                />
                <p className="state-active-cases-des">
                  {numberFormat.format(eachstateactivecases)}
                </p>
              </div>

              <div
                className="cases-container recovered-hover"
                testid="stateSpecificRecoveredCasesContainer"
              >
                <h1 className="state-recovered-heading">Recovered</h1>
                <img
                  src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1628572342/recovered_1_os4jpg.png"
                  className="state-confirmed-icon"
                  alt="state specific recovered cases pic"
                />
                <p
                  className="state-recovered-cases-des"
                  testid="stateSpecificRecoveredCasesContainer"
                >
                  {numberFormat.format(eachstaterecoveredcases)}
                </p>
              </div>

              <div
                className="cases-container deceased-hover"
                testid="stateSpecificDeceasedCasesContainer"
              >
                <h1 className="state-deceased-heading">Deceased</h1>
                <img
                  src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1628578893/breathing_1_juingi.png"
                  className="state-confirmed-icon"
                  alt="state specific deceased cases pic"
                />
                <p className="state-deceased-cases-des">
                  {numberFormat.format(eachstatedeceasedcases)}
                </p>
              </div>
            </div>

            <div className="district-details-container">
              <h1 className="top-district-title">Top Districts</h1>
              <ul
                className="top-districts-container "
                testid="topDistrictsUnorderedList"
              >
                {eachstatedistrictcases.map(eachTop => (
                  <li className="each-top-district" key={eachTop[0]}>
                    <p className="top-number">
                      {numberFormat.format(eachTop[1])}
                    </p>
                    <p className="top-district">{eachTop[0]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <CovidCharts stateId={id} />
        <Footer />
      </>
    )
  }
}

export default EachStateCovidDetails
