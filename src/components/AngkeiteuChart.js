import React from 'react';
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

  setChartData(options, participants) {
    let optionDescriptions = [];
    let optionSelectCounts = [];
    let optionParticipant = [];
    let nextState = {};

    if(typeof options === 'undefined')
      return;
    options.forEach((option, i) => {
      optionParticipant = participants.filter(participant => {
        return participant.selectedOptionId === option._id;
      });

      optionDescriptions.push(option.description);
      optionSelectCounts.push(optionParticipant.length);
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
        'data': this.props.data,
        'setChartData': this.setChartData
      });
    });
  }

  componentDidMount() {
    if(typeof this.props.data._id !== 'undefined') {
      this.setChartData(this.props.data.options, this.props.data.participants);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setChartData(nextProps.data.options, nextProps.data.participants);
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
