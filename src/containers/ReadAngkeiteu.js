import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { angkeiteuGetRequest, angkeiteuParticipateRequest } from 'actions/angkeiteu';
import { targetAngkeiteuListRequest, targetAngkeiteuListInit } from 'actions/targetAngkeiteu';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';
import { AngkeiteuPieChart, AngkeiteuForm, AngkeiteuList } from 'components';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedOptionId: '',
      participation: false,
      triggerOption: {}
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
    if(!this.state.participation && this.props.authenticateStatus.currentUser._id !== '')
      this.showParticipationInform();
    $(window).scrollTop(0);
  }

  componentWillReceiveProps(nextProps) {
    // update params.id
    if(nextProps.match.params.id !== this.props.match.params.id)
      this.loadAngkeiteu(nextProps.match.params.id);
  }

  loadAngkeiteu(id) {
    let nextState = {};

    this.props.angkeiteuGetRequest(id).then(() => {
      this.props.targetAngkeiteuListInit();
      nextState['selectedOptionId'] = '';
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
      return element.accountId === this.props.authenticateStatus.currentUser._id;
    });
    if(typeof participation !== 'undefined') {
      nextState['selectedOptionId'] = participation.selectedOptionId;
      nextState['participation'] = true;
      this.props.targetAngkeiteuListRequest(participation.selectedOptionId);
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
    let optionId = this.state.selectedOptionId;
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

  handleCreateTargetAngkeiteu(triggerOption) {
    let nextState = {};
    nextState['triggerOption'] = triggerOption;
    this.setState(nextState);
    $('#createTargetAngkeiteuModal').modal('open');
  }

  handleCompleteCreate(id) {
    $('#createTargetAngkeiteuModal').modal('close');
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
              <input name='selectedOptionId'
                     type='radio'
                     onChange={this.handleChange}
                     checked={this.state.selectedOptionId === option._id}
                     disabled={this.state.participation}
                     value={option._id}
                     id={option._id}/>
              <label htmlFor={option._id}>{option.description}</label>
            </div>
            <div className='col s2'>
              <a className='waves-effect waves-light btn'
                 onClick={() => this.handleCreateTargetAngkeiteu(option)}>
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

    const createTargetAngkeiteuModal = (
      <div id='createTargetAngkeiteuModal' className='modal'>
        <div className='modal-content'>
          <AngkeiteuForm mode='TargetAngkeiteu'
                         triggerOption={this.state.triggerOption}
                         onCompleteCreate={this.handleCompleteCreate}/>
        </div>
      </div>
    );

    const targetAngkeiteuListView = () => {
      let selectedOption = this.state.data.options.find((option, i) => {
        return option._id === this.state.selectedOptionId;
      });

      return (
        <div className='col s12'>
          <div className='divider'></div>
          <div className='section'>
            <h5>{`${selectedOption.description} of target angkeiteu`}</h5>
            <AngkeiteuList data={this.props.targetAngkeiteuListStatus.data}/>
          </div>
        </div>
      );
    }

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
          {this.state.participation ? targetAngkeiteuListView() : undefined}
        </div>
        {createTargetAngkeiteuModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        angkeiteuGetStaus: state.angkeiteu.get,
        participateStatus: state.angkeiteu.participate,
        authenticateStatus: state.authentication.status,
        targetAngkeiteuListStatus: state.targetAngkeiteu.list
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuGetRequest: (id) => {
      return dispatch(angkeiteuGetRequest(id));
    },
    angkeiteuParticipateRequest: (id, optionId) => {
      return dispatch(angkeiteuParticipateRequest(id, optionId));
    },
    targetAngkeiteuListRequest: (triggerOptionId) => {
      return dispatch(targetAngkeiteuListRequest(triggerOptionId));
    },
    targetAngkeiteuListInit: () => {
      return dispatch(targetAngkeiteuListInit());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadAngkeiteu);
