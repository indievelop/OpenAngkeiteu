import React from 'react'
import { connect } from 'react-redux'
import { AngkeiteuChartFilter} from 'components'
import { addChartFilterCondition, filtering, init } from 'actions/chartFilter'
import { init as initExplorer } from 'actions/angkeiteuExplorer'

class AngkeiteuChartFilterContainer extends React.Component {
  componentDidMount() {
    this.props.init()
    this.handleOnAngkeiteuExplorer = this.handleOnAngkeiteuExplorer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.angkeiteuExplorerStatus !== this.props.angkeiteuExplorerStatus) {
      if(nextProps.angkeiteuExplorerStatus.status === 'COMPLETE') {
        let {selectedAngkeiteu, selectedOption} = nextProps.angkeiteuExplorerStatus
        this.props.addChartFilterCondition(selectedAngkeiteu, selectedOption)
      }
    }

    if(nextProps.chartFilterStatus.conditions !== this.props.chartFilterStatus.conditions) {
      this.props.filtering(this.props.data.participants)
    }
  }

  handleOnAngkeiteuExplorer() {
    //find modal on
    this.props.initExplorer('Add FilterCondtion')
  }

  render() {
    const {conditions} = this.props.chartFilterStatus
    const {handleOnAngkeiteuExplorer} = this
    return (
      <AngkeiteuChartFilter {...{conditions, handleOnAngkeiteuExplorer}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      chartFilterStatus: state.chartFilter,
      angkeiteuExplorerStatus: state.angkeiteuExplorer,
      data: state.angkeiteu.get.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChartFilterCondition: (angkeiteu, option) => {
      return dispatch(addChartFilterCondition(angkeiteu, option))
    },
    filtering: (originParticipants) => {
      return dispatch(filtering(originParticipants))
    },
    init: () => {
      return dispatch(init())
    },
    initExplorer: (purpose) => {
      return dispatch(initExplorer(purpose))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuChartFilterContainer)
