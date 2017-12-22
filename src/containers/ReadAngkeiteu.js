import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { angkeiteuGetRequest, angkeiteuParticipateRequest,
         triggerAngkeiteuListRequest, targetAngkeiteuListRequest } from 'actions/angkeiteu';
import update from 'react-addons-update';
import TimeAgo from 'react-timeago';
import { AngkeiteuChart, AngkeiteuForm, AngkeiteuList, AngkeiteuHeader,
         AngkeiteuComment, OptionList, ImageView } from 'components';

class ReadAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOptionId: '',
      triggerOption: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAngkeiteu = this.loadAngkeiteu.bind(this);
    this.handleCompleteCreate = this.handleCompleteCreate.bind(this);
    this.handleCreateTargetAngkeiteu = this.handleCreateTargetAngkeiteu.bind(this);
    this.handleExpandMoreTargetAngkeiteuList = this.handleExpandMoreTargetAngkeiteuList.bind(this);
  }

  componentDidMount() {
    $(window).scrollTop(0);
    this.loadAngkeiteu(this.props.match.params.id, this.props.authenticateStatus.currentUser);
    $(document).ready(() => {
      $('.modal').modal({
        //set scroll location.
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // update authenticateStatus
    if(nextProps.authenticateStatus !== this.props.authenticateStatus)
      this.loadAngkeiteu(this.props.match.params.id,
                          nextProps.authenticateStatus.currentUser);
    // update params.id
    if(nextProps.match.params.id !== this.props.match.params.id)
      this.loadAngkeiteu(nextProps.match.params.id,
                          this.props.authenticateStatus.currentUser);
  }

  loadAngkeiteu(id, currentUser) {
    let accountId = undefined;
    let data = {};

    if(currentUser._id !== '')
      accountId = currentUser._id;
    this.props.angkeiteuGetRequest(id, accountId).then(() => {
      //currentUser participation infrom.
      data = this.props.angkeiteuGetStaus.data;
      if(typeof data.accountParticipation !== 'undefined')
        this.props.targetAngkeiteuListRequest(true, data.accountParticipation.selectedOptionId, undefined, undefined);
      //currentAngkeiteu triggerAngkeiteuList.
      if(typeof data.triggerOptionId !== 'undefined')
        this.props.triggerAngkeiteuListRequest(data.triggerOptionId);
    });
  }

  handleChange(e) {
    this.setState(e);
  }

  handleSubmit() {
    let id = this.props.match.params.id;
    let optionId = this.state.selectedOptionId;
    let msg = '';
    let nextState = {};

    this.props.angkeiteuParticipateRequest(id, optionId).then(() => {
      if(this.props.participateStatus.status === 'SUCCESS') {
        this.loadAngkeiteu(id, this.props.authenticateStatus.currentUser
        );
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

  handleExpandMoreTargetAngkeiteuList() {
    let accountParticipation = this.props.angkeiteuGetStaus.data.accountParticipation;
    let targetAngkeiteuList = this.props.targetAngkeiteuListStatus;
    this.props.targetAngkeiteuListRequest(false, accountParticipation.selectedOptionId,
                                          'old', targetAngkeiteuList.data[targetAngkeiteuList.data.length-1]._id);
  }

  render() {
    const {data} = this.props.angkeiteuGetStaus;

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

    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={this.handleExpandMoreTargetAngkeiteuList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    );

    const targetAngkeiteuListView = () => {
      let selectedOption = this.props.angkeiteuGetStaus.data.options.find((option) => {
        return option._id === data.accountParticipation.selectedOptionId;
      });

      return (
        <div className='col s12 m4'>
          <div className='divider'></div>
          <div className='section'>
            <h5>{`${selectedOption.description} of targetAngkeiteu`}</h5>
            <AngkeiteuList mode='only s12' data={this.props.targetAngkeiteuListStatus.data}/>
            {this.props.targetAngkeiteuListStatus.isLast ? undefined : expandMoreBtn }
          </div>
        </div>
      );
    };

    const triggerAngkeiteuListView = (
      <div className='col s12 m4'>
        <div className='divider'></div>
        <div className='section'>
          <h5>{`${data.title} of triggerAngkeiteu`}</h5>
          <AngkeiteuList mode='only s12' data={this.props.triggerAngkeiteuListStatus.data}/>
        </div>
      </div>
    );

    return (
      <div className='container readAngkeiteu'>
        <div className='row'>
          <div className='col s12 m8'>
            <div className='card'>
              <AngkeiteuHeader type={typeof data.accountParticipation !== 'undefined' ? 'PARTICIPATED' : 'UNPARTICIPATED'}/>
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
                {typeof data._id !== 'undefined' ? <ImageView objId={data._id} width={400} height={400}/> : undefined}
              </div>
              <div className='card-content'>
                options
              </div>
              <div className='card-content'>
                {typeof data.options !== 'undefined' ?
                  <OptionList data={data}
                              onChange={this.handleChange}
                              handleCreateTargetAngkeiteu={this.handleCreateTargetAngkeiteu}/> : undefined}
              </div>
              {typeof data.accountParticipation !== 'undefined' ? undefined : submitBtn}
            </div>
            <AngkeiteuChart data={data}/>
            <AngkeiteuComment angkeiteuId={data._id}/>
          </div>
          {typeof data.triggerOptionId !== 'undefined' ? triggerAngkeiteuListView : undefined}
          {typeof data.accountParticipation !== 'undefined' ? targetAngkeiteuListView() : undefined}
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
        targetAngkeiteuListStatus: state.angkeiteu.targetList,
        triggerAngkeiteuListStatus: state.angkeiteu.triggerList
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuGetRequest: (id, accountId) => {
      return dispatch(angkeiteuGetRequest(id, accountId));
    },
    angkeiteuParticipateRequest: (id, optionId) => {
      return dispatch(angkeiteuParticipateRequest(id, optionId));
    },
    targetAngkeiteuListRequest: (isInitial, triggerOptionId, listType, id) => {
      return dispatch(targetAngkeiteuListRequest(isInitial, triggerOptionId, listType, id));
    },
    triggerAngkeiteuListRequest: (triggerOptionId) => {
      return dispatch(triggerAngkeiteuListRequest(triggerOptionId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadAngkeiteu);
