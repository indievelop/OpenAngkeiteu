import React from 'react';
import { connect } from 'react-redux';
import { List, FilterCondition, AngkeiteuExplorer, SelectBtn } from 'components';
import { addChartFilterCondition, removeChartFilterCondition, filtering } from 'actions/chartFilter';

class AngkeiteuChartFilter extends React.Component {

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        //set scroll location.
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
    this.handleAddFilteringCondition = this.handleAddFilteringCondition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chartFilterStatus.conditions !== this.props.chartFilterStatus.conditions) {
      this.props.filtering(this.props.data.participants);
    }

    if(nextProps.chartFilterStatus.filteredParticipants !== this.props.chartFilterStatus.filteredParticipants) {
      this.props.setChartData(this.props.data.options, nextProps.chartFilterStatus.filteredParticipants);
    }
  }

  handleOnAngkeiteuExplorer() {
    //find modal on
    $('#angkeiteuExplorer').modal('open');
  }

  handleAddFilteringCondition(angkeiteu, option) {
    let filterCondition = {};
    filterCondition['_id'] = option._id
    filterCondition['angkeiteu'] = angkeiteu;
    filterCondition['option'] = option;
    this.props.addChartFilterCondition(filterCondition);
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12'>
            filtering conditions
            <List mode='only s12'data={this.props.chartFilterStatus.conditions}>
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
            <AngkeiteuExplorer onSubmit={this.handleAddFilteringCondition}>
              Add filtering condition
            </AngkeiteuExplorer>
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
    },
    filtering: (originParticipants) => {
      return dispatch(filtering(originParticipants));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuChartFilter);
