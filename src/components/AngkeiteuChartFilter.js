import React from 'react';
import { connect } from 'react-redux';
import { List, FilterCondition, AngkeiteuExplorer } from 'components';
import { addChartFilterCondition, removeChartFilterCondition } from 'actions/chartFilter';

class AngkeiteuChartFilter extends React.Component {

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        //set scroll location.
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  handleOnAngkeiteuExplorer() {
    //find modal on
    $('#angkeiteuExplorer').modal('open');
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12'>
            filtering conditions
            <List data={this.props.chartFilterStatus.conditions}>
              <FilterCondition/>
            </List>
          </div>
          <div className="input-field col s6">
             <label>New filterCondition</label>
              <input name="option_desc"
                     type="text"
                     disabled='true'>
              </input>
          </div>
          <div className="input-field col s6">
              <a className="btn waves-effect waves-light"
                 onClick={this.handleOnAngkeiteuExplorer}>
                 <i className="material-icons center">add</i>
              </a>
          </div>
        </div>
        <div id='angkeiteuExplorer' className='modal'>
          <div className='modal-content'>
            <AngkeiteuExplorer/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      chartFilterStatus: state.chartFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addChartFilterCondition: (filterCondition) => {
      return dispatch(addChartFilterCondition(filterCondition));
    },
    removeChartFilterCondition: (filterCondition) => {
      return dispatch(removeChartFilterCondition(filterCondition));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuChartFilter);
