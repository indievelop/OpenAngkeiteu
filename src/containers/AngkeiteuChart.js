import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { AngkeiteuChart } from 'components'

class AngkeiteuChartContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: [],
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: []
        }]
      }
    }
    this.setChartData = this.setChartData.bind(this)
  }

  setChartData(options, participants) {
    let optionDescriptions = []
    let optionSelectCounts = []
    let optionParticipant = []
    let nextState = {}

    if(typeof options === 'undefined')
      return
    options.forEach((option, i) => {
      optionParticipant = participants.filter(participant => {
        return participant.selectedOptionId === option._id
      })
      optionDescriptions.push(option.description)
      optionSelectCounts.push(optionParticipant.length)
    })

    nextState = {
      chartData: {
        labels: optionDescriptions,
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: optionSelectCounts
        }]
      }
    }
    this.setState(nextState)
  }

  componentDidMount() {
    if(typeof this.props.fixedData !== 'undefined' || typeof this.props.data._id !== 'undefined') {
      const {fixedData, data} = this.props
      const {options, participants} = (typeof fixedData !== 'undefined') ? fixedData : data
      this.setChartData(options, participants)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chartFilterStatus.filteredParticipants !== this.props.chartFilterStatus.filteredParticipants) {
      if(this.props.isOnFiltering) {
        this.setChartData(this.props.data.options, nextProps.chartFilterStatus.filteredParticipants)
      }
    }

    if(nextProps.data !== this.props.data) {
      this.setChartData(nextProps.data.options, nextProps.data.participants)
    }
  }

  render() {
    const {chartData} = this.state
    return (
      <AngkeiteuChart {...{chartData}}/>
    )
  }
}

AngkeiteuChartContainer.propTypes = {
  fixedData: PropTypes.object,
  isOnFiltering: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    data: state.angkeiteu.get.data,
    chartFilterStatus: state.chartFilter
  }
}

export default connect(mapStateToProps)(AngkeiteuChartContainer)
