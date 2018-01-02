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
        <div id='angkeiteuExplorer' className='modal'>
          <div className='modal-content'>
            <AngkeiteuExplorer onSubmit={this.props.addChartFilterCondition}>
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
    addChartFilterCondition: (angkeiteu, option) => {
      return dispatch(addChartFilterCondition(angkeiteu, option));
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
