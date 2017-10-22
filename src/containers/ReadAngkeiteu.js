import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    let options = this.props.data.options;
    var ctx = $('#chart').get(0).getContext('2d');
    let optionDescriptions = [];
    let optionSelectCounts = [];

    options.forEach((option, i) => {
      optionDescriptions.push(option.description)
      optionSelectCounts.push(option.selectCount);
    });

    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',
      // The data for our dataset
      data: {
          labels: optionDescriptions,
          datasets: [{
              label: "My First dataset",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: optionSelectCounts,
          }]
        },
        // Configuration options go here
        options: {}
      }
    );
  }
  componentDidMount() {
    this.drawChart();
  }

  render() {
    const {data} = this.props;

    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option.id}>
            <div className='col s12'>
              <input name='optionGroup'
                     type='radio'
                     id={option.id}/>
              <label htmlFor={option.id}>{option.description}</label>
            </div>
          </div>
        );
      });
    }

    return (
      <div className='container readAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            <div className='card'>
              <div className='card-content'>
                <div className='card-title'>
                  <h3>{data.title}</h3>
                </div>
              </div>
              <div className='card-content'>
                <p>writer: {data.writer}</p>
                <p>{data.viewCount} views</p>
                <TimeAgo date={data.createdDate}/>
              </div>
              <div className='divider'></div>
              <div className='card-content'>
                <h5>description: {data.description}</h5>
              </div>
              <div className='card-content'>
                <div className='row'>
                  <div className='col s12 l4'>
                    {mapToOptions(data.options)}
                  </div>
                  <div className='col s12 l8'>
                    <canvas id='chart'></canvas>
                  </div>
                </div>
              </div>

              <div className='card-action'>
                <a>submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.angkeiteu.get.status,
        data: state.angkeiteu.get.data
    };
};

export default connect(mapStateToProps)(ReadAngkeiteu);
