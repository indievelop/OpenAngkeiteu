import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

class AngkeiteuChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: []
        }]
      }
    };
    this.renderFilterChildren = this.renderFilterChildren.bind(this);
    this.setChartData = this.setChartData.bind(this);
  }

  setChartData(data) {
    let options = [];
    let optionDescriptions = [];
    let optionSelectCounts = [];
    let nextState = {};

    if(typeof data.options === 'undefined')
      return;
    options = data.options;
    options.forEach((option, i) => {
      optionDescriptions.push(option.description);
      optionSelectCounts.push(option.selectCount);
    });

    nextState = {
      data: {
        labels: optionDescriptions,
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: optionSelectCounts
        }]
      }
    };
    this.setState(nextState);
  }

  renderFilterChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        'data': this.props.data
      });
    });
  }

  componentDidMount() {
    if(typeof this.props.data._id !== 'undefined') {
      this.setChartData(this.props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setChartData(nextProps.data);
    }
  }

  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.renderFilterChildren()}
        </div>
        <div className='divider'></div>
        <div className='card-content'>
          <Pie data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default AngkeiteuChart;
