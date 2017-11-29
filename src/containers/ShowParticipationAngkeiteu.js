import React from 'react';
import { AngkeiteuList } from 'components';
import { connect } from 'react-redux';
import { participationAngkeiteuListRequest } from 'actions/angkeiteu';

class ShowParticipationAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.handleExpandMoreParticipationAngkeiteuList = this.handleExpandMoreParticipationAngkeiteuList.bind(this);
  }

  componentDidMount() {
    this.props.participationAngkeiteuListRequest(true, this.props.match.params.accountId);
  }

  componentWillReceiveProps(nextProps) {
    //update params.accountId
    if(nextProps.match.params.accountId !== this.props.match.params.accountId)
      this.props.participationAngkeiteuListRequest(true, nextProps.match.params.accountId);
  }

  handleExpandMoreParticipationAngkeiteuList() {
    let participationList = this.props.participationAngkeiteuListStatus.data;
    this.props.participationAngkeiteuListRequest(false, this.props.match.params.accountId, 'old', participationList[participationList.length-1]._id);
  }

  render() {
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={this.handleExpandMoreParticipationAngkeiteuList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    );

    const participationListView = (listStatus) => {
      return (
        <div className='section'>
          <h5>{this.props.match.params.accountId} of participation angkeiteu</h5>
          <AngkeiteuList data={listStatus.data}/>
          {listStatus.isLast ? undefined : expandMoreBtn}
        </div>
      );
    }

    return (
      <div className='container ShowParticipationAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            {participationListView(this.props.participationAngkeiteuListStatus)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    participationAngkeiteuListStatus: state.angkeiteu.participationList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    participationAngkeiteuListRequest: (isInitial, accountId, listType, id) => {
      return dispatch(participationAngkeiteuListRequest(isInitial, accountId, listType, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowParticipationAngkeiteu);
