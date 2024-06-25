import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineRight} from 'react-icons/ai'

import './index.css'

class SearchSuggestions extends Component {
  getCamelCase = state => ({
    stateCode: state.state_code,
    stateName: state.state_name,
  })

  render() {
    const {statesList} = this.props

    return (
      <ul className="suggestions-list" testid="searchResultsUnorderedList">
        {statesList.map(state => {
          const {stateCode, stateName} = this.getCamelCase(state)
          return (
            <Link
              key={stateCode}
              className="states-link"
              to={`/state/${stateCode}`}
            >
              <li className="states-container">
                <p className="state-name-1">{stateName}</p>
                <div className="state-code-container">
                  <p className="state-code">{stateCode}</p>
                  <img
                    src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1629179297/Line_jz6euo.png"
                    alt="line"
                    className="line-img"
                  />
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }
}

export default SearchSuggestions
