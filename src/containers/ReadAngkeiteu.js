import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { angkeiteuGetRequest, angkeiteuParticipateRequest } from 'actions/angkeiteu';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';
import { AngkeiteuPieChart } from 'components';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      option: '',
      participation: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showParticipationInform = this.showParticipationInform.bind(this);
    this.loadAngkeiteu = this.loadAngkeiteu.bind(this);
  }

  componentDidMount() {
    this.loadAngkeiteu();
  }

  componentDidUpdate(prevProps, prevState) {
    if(Object.keys(this.state.data).length === 0)
      return;
    if(!this.state.participation && this.props.authenticateStatus.currentUser !== '')
      this.showParticipationInform();
  }

  loadAngkeiteu() {
    let nextState = {};

    this.props.angkeiteuGetRequest(this.props.match.params.id).then(() => {
      nextState['data'] = this.props.angkeiteuGetStaus.data;
      return this.setState(nextState);
    });
  }

  showParticipationInform() {
    let participation = {};
    let nextState = {};

    participation = this.state.data.participants.find((element) => {
      return element.email === this.props.authenticateStatus.currentUser;
    });

    if(typeof participation !== 'undefined') {
      nextState['option'] = participation.selectedOptionId;
      nextState['participation'] = true;
      return this.setState(nextState);
    }
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
    let nextState = {};

    this.props.angkeiteuParticipateRequest(id, optionId).then(() => {
      if(this.props.participateStatus.status === 'SUCCESS') {
        nextState['data'] = this.props.participateStatus.data;
        return this.setState(nextState);
      } else {
        msg = this.props.participateStatus.error.error;
        Materialize.toast($(`<span style="color: #FFB4BA">${msg}</span>`), 2000);
      }
    });
  }
/*
  drawChart() {
    console.log(this.state.data);
    let options = this.state.data.options;
    var canvas = $('#chart').get(0);
    var ctx = canvas.getContext('2d');
    let optionDescriptions = [];
    let optionSelectCounts = [];

    options.forEach((option, i) => {
      optionDescriptions.push(option.description)
      optionSelectCounts.push(option.selectCount);
    });

    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',
      // The data for our dataset
      data: {
          labels: optionDescriptions,
          datasets: [{
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: optionSelectCounts,
          }]
        },
        // Configuration options go here
        options: {}
      }
    );
    return window.chart = chart;
  }
*/
  render() {
    const {data} = this.state;

    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option._id}>
            <div className='col s12'>
              <input name='option'
                     type='radio'
                     onChange={this.handleChange}
                     checked={this.state.option === option._id}
                     disabled={this.state.participation}
                     value={option._id}
                     id={option._id}/>
                   <label htmlFor={option._id}>{option.description}</label>
            </div>
          </div>
        );
      });
    }

    const pleaseHeader =  (
      <div className='header orange white-text center'>
        <div className='card-content'>
          Please response Angkeiteu.
        </div>
      </div>
    );

    const thankyouHeader = (
      <div className='header green white-text center'>
        <div className='card-content'>
          thank you for your participation.
        </div>
      </div>
    );

    const submitBtn = (
      <div className='card-action'>
        <a onClick={this.handleSubmit}>submit</a>
      </div>
    );

    return (
      <div className='container readAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            <div className='card'>
              {this.state.participation ? thankyouHeader : pleaseHeader}
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
                    {typeof data.options === 'undefined' ? undefined : mapToOptions(data.options)}
                  </div>
                  <div className='col s12 l8 chartContainer'>
                     <AngkeiteuPieChart data={data}/>
                  </div>
                </div>
              </div>
              {this.state.participation ? undefined : submitBtn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        angkeiteuGetStaus: state.angkeiteu.get,
        participateStatus: state.angkeiteu.participate,
        authenticateStatus: state.authentication.status
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
