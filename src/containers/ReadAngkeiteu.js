import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { angkeiteuGetRequest, angkeiteuParticipateRequest } from 'actions/angkeiteu';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option: ''
    };
    this.drawChart = this.drawChart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.angkeiteuGetRequest(this.props.match.params.id).then(()=>{
        this.drawChart();
    })
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit() {
    let id = this.props.match.params.id;
    let optionId = this.state.option;
    let msg = '';
    this.props.angkeiteuParticipateRequest(id, optionId).then(() => {
      if(this.props.participateStatus.status === 'SUCCESS') {
        console.log('www');
      } else {
        msg = this.props.participateStatus.error.error;
        Materialize.toast($(`<span style="color: #FFB4BA">${msg}</span>`), 2000);
      }
    });
  }

  drawChart() {
    let options = this.props.getStatus.data.options;
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
              label: "current selection info",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: optionSelectCounts,
          }]
        },
        // Configuration options go here
        options: {}
      }
    );
  }

  render() {
    const {data} = this.props.getStatus;

    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option._id}>
            <div className='col s12'>
              <input name='option'
                     type='radio'
                     onChange={this.handleChange}
                     value={option._id}
                     id={option._id}/>
                   <label htmlFor={option._id}>{option.description}</label>
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
                    {typeof data.options === 'undefined' ? undefined: mapToOptions(data.options)}
                  </div>
                  <div className='col s12 l8'>
                    <canvas id='chart'></canvas>
                  </div>
                </div>
              </div>
              <div className='card-action'>
                <a onClick={this.handleSubmit}>submit</a>
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
        getStatus: state.angkeiteu.get,
        participateStatus: state.angkeiteu.participate
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuGetRequest: (id) => {
      return dispatch(angkeiteuGetRequest(id));
    },
    angkeiteuParticipateRequest: (id, optionId) => {
      return dispatch(angkeiteuParticipateRequest(id, optionId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadAngkeiteu);
