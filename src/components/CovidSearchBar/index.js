import {BsSearch} from 'react-icons/bs'

import './index.css'

const CovidSearchBar = props => {
  const {onChangeSearchInput, searchInput} = props

  return (
    <div className="search-input-container">
      <BsSearch className="search-icon" />
      <input
        type="search"
        placeholder="Search the state"
        value={searchInput}
        onChange={onChangeSearchInput}
        className="search-input"
      />
    </div>
  )
}

export default CovidSearchBar
