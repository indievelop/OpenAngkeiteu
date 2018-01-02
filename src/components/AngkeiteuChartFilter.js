import React from 'react';
import { connect } from 'react-redux';
import { List, FilterCondition, AngkeiteuExplorer, SelectBtn } from 'components';
import { addChartFilterCondition, removeChartFilterCondition, filtering, init } from 'actions/chartFilter';
import { init as explorerInit } from 'actions/angkeiteuExplorer';

class AngkeiteuChartFilter extends React.Component {

  componentDidMount() {
    this.props.init();
    this.handleOnAngkeiteuExplorer = this.handleOnAngkeiteuExplorer.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.angkeiteuExplorerStatus !== this.props.angkeiteuExplorerStatus) {
      if(nextProps.angkeiteuExplorerStatus.status === 'COMPLETE') {
        let {selectedAngkeiteu, selectedOption} = nextProps.angkeiteuExplorerStatus;
        this.props.addChartFilterCondition(selectedAngkeiteu, selectedOption);
      }
    }

    if(nextProps.chartFilterStatus.conditions !== this.props.chartFilterStatus.conditions) {
      this.props.filtering(this.props.data.participants);
    }

    if(nextProps.chartFilterStatus.filteredParticipants !== this.props.chartFilterStatus.filteredParticipants) {
      this.props.setChartData(this.props.data.options, nextProps.chartFilterStatus.filteredParticipants);
    }
  }

  handleOnAngkeiteuExplorer() {
    //find modal on
    this.props.explorerInit('Add FilterCondtion');
    $('#angkeiteuExplorerModal').modal('open');
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12'>
            filtering conditions
            <List mode='only s12'data={this.props.chartFilterStatus.conditions}>
              <FilterCondition>
                <SelectBtn className='btn' onSelect={this.props.removeChartFilterCondition}>
                  <i className="material-icons center">close</i>
                </SelectBtn>
              </FilterCondition>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      chartFilterStatus: state.chartFilter,
      angkeiteuExplorerStatus: state.angkeiteuExplorer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addChartFilterCondition: (angkeiteu, option) => {
      return dispatch(addChartFilterCondition(angkeiteu, option));
    },
    removeChartFilterCondition: (filterCondition) => {
      return dispatch(removeChartFilterCondition(filterCondition));
    },
    filtering: (originParticipants) => {
      return dispatch(filtering(originParticipants));
    },
    init: () => {
      return dispatch(init());
    },
    explorerInit: (purpose) => {
      return dispatch(explorerInit(purpose));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuChartFilter);
