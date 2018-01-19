import React from 'react'
import PropTypes from 'prop-types'
import { AngkeiteuDetail, List, Option, ShowImgBtn, SelectBtn } from 'components'

class AngkeiteuParticipationForm extends React.Component {
  render() {
    const {data, selectedOptionId, handleChange, handleCreateTargetAngkeiteu,
           handleSubmit} = this.props
    const participateBtn = (data) => {
      if(typeof data !=='undefined') {
        if(typeof data.accountParticipation !== 'undefined') {
          return undefined
        } else {
          return (<SelectBtn onSelect={handleSubmit}>participate</SelectBtn>)
        }
      }
      return undefined
    }
    return (
      <div>
        <AngkeiteuDetail {...{data}}>
          <List className='row'>
            <Option className='col s12'
                     name='selectedOptionId'
                     handleChange={handleChange}
                     selectedOptionId={selectedOptionId}
                     accountParticipation={data.accountParticipation}>
              <ShowImgBtn/>
              <SelectBtn className='btn' onSelect={handleCreateTargetAngkeiteu}>
                <i className='material-icons'> create</i>
              </SelectBtn>
            </Option>
          </List>
          {participateBtn(data)}
        </AngkeiteuDetail>
      </div>
    )
  }
}

AngkeiteuParticipationForm.propTypes = {
  data: PropTypes.object.isRequired,
  selectedOptionId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCreateTargetAngkeiteu: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AngkeiteuParticipationForm
