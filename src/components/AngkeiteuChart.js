import React from 'react'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'

class AngkeiteuChart extends React.Component {
  render() {
    const {chartData} = this.props
    return (
      <Pie data={chartData}/>
    )
  }
}

AngkeiteuChart.propTypes = {
  chartData: PropTypes.object.isRequired
}

export default AngkeiteuChart
