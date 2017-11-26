import React from 'react';
import { AngkeiteuList } from 'components';
import { connect } from 'react-redux';
import { angkeiteuListRequest, hotAngkeiteuListRequest } from 'actions/angkeiteu';


class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedPeriod: 'today'
      }
      this.handleExpandMoreAngkeiteuList = this.handleExpandMoreAngkeiteuList.bind(this);
      this.handleChangePeriod = this.handleChangePeriod.bind(this);
  }

  componentDidMount() {
    if(this.props.angkeiteuListStatus.data.length == 0) {
      this.props.angkeiteuListRequest(true);
      this.props.hotAngkeiteuListRequest(true, 'today');
    }
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

    this.props.hotAngkeiteuListRequest(true, e.target.name);
    this.setState(nextState);
  }

  handleExpandMoreAngkeiteuList(targetName) {
    let angkeiteuList = [];

    if(targetName === 'list') {
      angkeiteuList = this.props.angkeiteuListStatus.data;
      this.props.angkeiteuListRequest(false, 'old', angkeiteuList[angkeiteuList.length-1]._id);
    } else {
      angkeiteuList = this.props[`angkeiteu_hot_${targetName}ListStatus`].data;
      this.props.hotAngkeiteuListRequest(false, this.state.selectedPeriod, 'old', angkeiteuList[angkeiteuList.length-1]._id);
    }
  }

  render() {
    const selectPeriodDropdownBtn = (
      <div>
        <a className='dropdown-button btn' data-activates='dropdown1'>
          {this.state.selectedPeriod}
          <i className='material-icons right'>arrow_drop_down</i>
        </a>

        <ul id='dropdown1' className='dropdown-content'>
          <li><a name='today' onClick={this.handleChangePeriod}>Today</a></li>
          <li><a name='thisMonth' onClick={this.handleChangePeriod}>This Month</a></li>
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

    const hotListView = (listStatus) => {
      return (
        <div className='section'>
          <h5>hot angkeiteu</h5>
          {selectPeriodDropdownBtn}
          <AngkeiteuList data={listStatus.data}/>
          {listStatus.isLast ? undefined : expandMoreBtn(this.state.selectedPeriod)}
        </div>
      );
    }

    return (
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            {hotListView(this.props[`angkeiteu_hot_${this.state.selectedPeriod}ListStatus`])}
          </div>
          <div className='col s12'>
            <div className='divider'></div>
            <div className='section'>
              <h5>recent angkeiteu</h5>
              <AngkeiteuList data={this.props.angkeiteuListStatus.data}/>
              {this.props.angkeiteuListStatus.isLast ? undefined : expandMoreBtn('list')}
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
      angkeiteu_hot_todayListStatus: state.angkeiteu.hot_todayList,
      angkeiteu_hot_thisMonthListStatus: state.angkeiteu.hot_thisMonthList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      angkeiteuListRequest: (isInitial, listType ,id, email) => {
        return dispatch(angkeiteuListRequest(isInitial, listType, id, email));
      },
      hotAngkeiteuListRequest: (isInitial, period, listType ,id) => {
        return dispatch(hotAngkeiteuListRequest(isInitial, period, listType ,id));
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
