import React from 'react';
import { AngkeiteuList } from 'components';
import { connect } from 'react-redux';
import { writerAngkeiteuListRequest } from 'actions/angkeiteu';

class ShowWritingAngkeiteu extends React.Component {

  constructor(props) {
    super(props);
    this.handleExpandMoreWritingAngkeiteuList = this.handleExpandMoreWritingAngkeiteuList.bind(this);
  }

  componentDidMount() {
    this.props.writerAngkeiteuListRequest(true, this.props.match.params.email);
  }

  componentWillReceiveProps(nextProps) {
    //update params.email
    if(nextProps.match.params.email !== this.props.match.params.email)
      this.props.writerAngkeiteuListRequest(true, nextProps.match.params.email);
  }

  handleExpandMoreWritingAngkeiteuList() {
    let writingList = this.props.writerAngkeiteuListStatus.data;
    this.props.writerAngkeiteuListRequest(false, this.props.match.params.email, 'old', writingList[writingList.length-1]._id);
  }

  render() {
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={this.handleExpandMoreWritingAngkeiteuList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    );

    const writingListView = (listStatus) => {
      return (
        <div className='section'>
          <h5>{this.props.match.params.email} of writing angkeiteu</h5>
          <AngkeiteuList data={listStatus.data}/>
          {listStatus.isLast ? undefined : expandMoreBtn}
        </div>
      );
    }

    return (
      <div className='container showWritingAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            {writingListView(this.props.writerAngkeiteuListStatus)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticateStatus: state.authentication.status,
    writerAngkeiteuListStatus: state.angkeiteu.writerList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    writerAngkeiteuListRequest: (isInitial, writer, listType, id) => {
      return dispatch(writerAngkeiteuListRequest(isInitial, writer, listType, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowWritingAngkeiteu);
