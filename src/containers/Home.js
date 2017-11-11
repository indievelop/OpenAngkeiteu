import React from 'react';
import { AngkeiteuList } from 'components';
import { connect } from 'react-redux';
import { angkeiteuListRequest } from 'actions/angkeiteu';


class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedPeriod: 'Today'
      }
      this.handleExpandMoreAngkeiteuList = this.handleExpandMoreAngkeiteuList.bind(this);
      this.handleChangePeriod = this.handleChangePeriod.bind(this);
  }

  componentDidMount() {
    this.props.angkeiteuListRequest(true, 'recent');
    this.props.angkeiteuListRequest(true, 'hot'+ this.state.selectedPeriod);

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }

  handleChangePeriod(e) {
    let nextState = {};
    nextState['selectedPeriod'] = e.target.name;

    this.props.angkeiteuListRequest(true, 'hot'+ e.target.name);
    this.setState(nextState);
  }

  handleExpandMoreAngkeiteuList(targetName) {
    let angkeiteuList = [];

    if(targetName === 'recent') {
      angkeiteuList = this.props.angkeiteuListStatus.data;
      this.props.angkeiteuListRequest(false, 'recent', 'old', angkeiteuList[angkeiteuList.length-1]._id);
    } else if(targetName === 'hot') {
      angkeiteuList = this.props.angkeiteuHotListStatus.data;
      this.props.angkeiteuListRequest(false, 'hot'+this.state.selectedPeriod, 'old', angkeiteuList[angkeiteuList.length-1]._id);
    }
  }

  render() {

    const selectPeriodDropdownBtn = (
      <div>
        <a className='dropdown-button btn' onClick={()=>{}} data-activates='dropdown1'>
          {this.state.selectedPeriod}
          <i className='material-icons right'>arrow_drop_down</i>
        </a>

        <ul id='dropdown1' className='dropdown-content'>
          <li><a name='Today' onClick={this.handleChangePeriod}>Today</a></li>
          <li><a name='ThisMonth' onClick={this.handleChangePeriod}>This Month</a></li>
        </ul>
      </div>
    );

    const expandMoreBtn = targetName => {
      return (
          <div className='center-align'>
            <a className='waves-effect waves-light btn'
               onClick={()=>{this.handleExpandMoreAngkeiteuList(targetName)}}>
              <i className='material-icons'>expand_more</i>
            </a>
          </div>
      );
    }

    return (
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            <div className='section'>
              <h5>hot angkeiteu</h5>
              {selectPeriodDropdownBtn}
              <AngkeiteuList data={this.props.angkeiteuHotListStatus.data}/>
              {this.props.angkeiteuHotListStatus.isLast ? undefined : expandMoreBtn('hot')}
            </div>
          </div>
          <div className='col s12'>
            <div className='divider'></div>
            <div className='section'>
              <h5>recent angkeiteu</h5>
              <AngkeiteuList data={this.props.angkeiteuListStatus.data}/>
              {this.props.angkeiteuListStatus.isLast ? undefined : expandMoreBtn('recent')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      angkeiteuListStatus: state.angkeiteu.list,
      angkeiteuHotListStatus: state.angkeiteu.hotList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      angkeiteuListRequest: (isInitial, orderType ,id, email) => {
          return dispatch(angkeiteuListRequest(isInitial, orderType, id, email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
