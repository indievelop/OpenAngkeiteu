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
  }

  renderFilterChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        'data': this.props.data
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    let options = {};
    let optionDescriptions = [];
    let optionSelectCounts = [];
    let nextState = {};

    if(typeof nextProps.data.options === 'undefined')
      return;
    options = nextProps.data.options;
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
