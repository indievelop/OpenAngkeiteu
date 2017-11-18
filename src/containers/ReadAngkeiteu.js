import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { angkeiteuGetRequest, angkeiteuParticipateRequest } from 'actions/angkeiteu';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';
import { AngkeiteuPieChart, AngkeiteuForm } from 'components';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      option: '',
      participation: false,
      triggerOption: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showParticipationInform = this.showParticipationInform.bind(this);
    this.loadAngkeiteu = this.loadAngkeiteu.bind(this);
    this.handleCompleteCreate = this.handleCompleteCreate.bind(this);
  }

  componentDidMount() {
    this.loadAngkeiteu(this.props.match.params.id);
    $(document).ready(() => {
      $('.modal').modal({
        //set scroll location.
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(Object.keys(this.state.data).length === 0)
      return;
    // update params.id
    if(prevProps.match.params.id !== this.props.match.params.id)
      this.loadAngkeiteu(this.props.match.params.id);
    if(!this.state.participation && this.props.authenticateStatus.currentUser !== '')
      this.showParticipationInform();
  }

  loadAngkeiteu(id) {
    let nextState = {};

    this.props.angkeiteuGetRequest(id).then(() => {
      nextState['option'] = '';
      nextState['participation'] = false;
      nextState['data'] = this.props.angkeiteuGetStaus.data;
      nextState['triggerOption'] = {};
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

  handleCreateSubAngkeiteu(triggerOption) {
    let nextState = {};
    nextState['triggerOption'] = triggerOption;
    this.setState(nextState);
    $('#createSubAngkeiteuModal').modal('open');
  }

  handleCompleteCreate(id) {
    $('#createSubAngkeiteuModal').modal('close');
    this.props.history.push('/readAngkeiteu/' + id);
  }

  render() {
    const {data} = this.state;

    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option._id}>
            <div className='col s10'>
              <input name='option'
                     type='radio'
                     onChange={this.handleChange}
                     checked={this.state.option === option._id}
                     disabled={this.state.participation}
                     value={option._id}
                     id={option._id}/>
              <label htmlFor={option._id}>{option.description}</label>
            </div>
            <div className='col s2'>
              <a className='waves-effect waves-light btn'
                 onClick={() => this.handleCreateSubAngkeiteu(option)}>
                <i className='material-icons center'>create</i>
              </a>
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

    const createSubAngkeiteuModal = (
      <div id='createSubAngkeiteuModal' className='modal'>
        <div className='modal-content'>
          <AngkeiteuForm mode='SubAngkeiteu'
                         triggerOption={this.state.triggerOption}
                         onCompleteCreate={this.handleCompleteCreate}/>
        </div>
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
        {createSubAngkeiteuModal}
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
