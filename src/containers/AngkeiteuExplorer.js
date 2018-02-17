import React from 'react'
import { connect } from 'react-redux'
import { AngkeiteuExplorer } from 'components'
import { selectAngkeiteu, unselectAngkeiteu, selectOption, complete } from 'actions/angkeiteuExplorer'

class AngkeiteuExplorerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let findedOption = this.props.angkeiteuExplorerStatus.selectedAngkeiteu.options.find((option) => {
      return option._id === e.target.value
    })
    this.props.selectOption(findedOption)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.angkeiteuExplorerStatus.selectedAngkeiteu !== this.props.angkeiteuExplorerStatus.selectedAngkeiteu) {
      $('#angkeiteuExplorer').scrollTop(0)
    }
  }

  handleSubmit() {
    let {selectedAngkeiteu, selectedOption} = this.props.angkeiteuExplorerStatus
    if(typeof selectedAngkeiteu._id !== 'undefined' && typeof selectedOption._id !== 'undefined') {
      this.props.complete()
    }
  }

  render() {
    const {angkeiteuExplorerStatus, searchStatus,
           selectAngkeiteu, unselectAngkeiteu} = this.props
    const {handleChange, handleSubmit} = this
    return (
      <AngkeiteuExplorer {...{angkeiteuExplorerStatus, searchStatus,
           unselectAngkeiteu, selectAngkeiteu, handleChange, handleSubmit}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      angkeiteuExplorerStatus: state.angkeiteuExplorer,
      searchStatus: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectAngkeiteu: (angkeiteu) => {
      return dispatch(selectAngkeiteu(angkeiteu))
    },
    unselectAngkeiteu: () => {
      return dispatch(unselectAngkeiteu())
    },
    selectOption: (option) => {
      return dispatch(selectOption(option))
    },
    complete: () => {
      return dispatch(complete())
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuExplorerContainer)
