import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar, SelectBtn, List, Option, Angkeiteu,
         AngkeiteuDetail, AngkeiteuComment, ShowImgBtn, Card} from 'components'
import { AngkeiteuChart } from 'containers'

class AngkeiteuExplorer extends React.Component {
  render() {
    const {angkeiteuExplorerStatus, unselectAngkeiteu, handleChange,
           handleSubmit, selectAngkeiteu, searchStatus } = this.props
    const backBtn = (
      <a className='btn' onClick={unselectAngkeiteu}>
        back
      </a>
    )
    const selectedAngkeiteuView = (
      <div>
        <AngkeiteuDetail data={angkeiteuExplorerStatus.selectedAngkeiteu}>
          <List className='row'>
            <Option className='col s12'
                    handleChange={handleChange}
                    selectedOptionId={angkeiteuExplorerStatus.selectedOption._id}>
              <ShowImgBtn/>
            </Option>
          </List>
          <SelectBtn onSelect={handleSubmit}>
            {angkeiteuExplorerStatus.purpose}
          </SelectBtn>
        </AngkeiteuDetail>
        <Card>
          <AngkeiteuChart isOnFiltering={false} fixedData={angkeiteuExplorerStatus.selectedAngkeiteu}/>
        </Card>
        {backBtn}
      </div>
    )
    const findAngkeiteuView = (
      <div>
        <SearchBar/>
        <List className='row' data={searchStatus.result.data}>
          <Angkeiteu className='col s12'>
            <SelectBtn onSelect={selectAngkeiteu}>open</SelectBtn>
          </Angkeiteu>
        </List>
      </div>
    )
    return (
      <div className='row'>
        <div className='col s12 center'>
          <h5>AngkeiteuExplorer</h5>
        </div>
        <div className='col s12'>
          {typeof angkeiteuExplorerStatus.selectedAngkeiteu._id === 'undefined' ?
           findAngkeiteuView : selectedAngkeiteuView}
        </div>
      </div>
    )
  }
}

AngkeiteuExplorer.propTypes = {
  angkeiteuExplorerStatus: PropTypes.object.isRequired,
  searchStatus: PropTypes.object.isRequired,
  selectAngkeiteu: PropTypes.func.isRequired,
  unselectAngkeiteu: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AngkeiteuExplorer
