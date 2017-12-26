import React from 'react';
import { connect } from 'react-redux';
import { SearchBar, SelectBtn, List, FilterCondition,
         Angkeiteu, AngkeiteuDetail, AngkeiteuChart, AngkeiteuComment} from 'components';
import { selectAngkeiteu } from 'actions/chartFilter';

class AngkeiteuChartFilter extends React.Component {

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        //set scroll location.
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  handleOnAngkeiteuChartFilterEditor() {
    //find modal on
    $('#filterConditionExplorer').modal('open');
  }

  render() {
    const filterConditionExplorer = (
      <div id='filterConditionExplorer' className='modal'>
        <div className='modal-content'>
          <div className='row'>
            <div className='col s12'>
              <h5>filter condtions </h5>
              <List data={this.props.chartFilterStatus.conditions}>
                <FilterCondition/>
              </List>
            </div>
            <div className='col s6'>
              <SearchBar/>
              <List mode='only s12' data={this.props.searchStatus.result.data}>
                <Angkeiteu>
                  <SelectBtn onSelect={this.props.selectAngkeiteu}>open</SelectBtn>
                </Angkeiteu>
              </List>
            </div>
            <div className='col s6'>
              selected angkeiteu
              <AngkeiteuDetail data={this.props.chartFilterStatus.selectAngkeiteu}/>
              <AngkeiteuChart data={this.props.chartFilterStatus.selectAngkeiteu}/>
              <AngkeiteuComment angkeiteuId={this.props.chartFilterStatus.selectAngkeiteu._id}/>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className='row'>
          <div className='col s10'>
            filtering conditions
          </div>
          <div className='col s2'>
            <a className='waves-effect waves-light btn'
               onClick={this.handleOnAngkeiteuChartFilterEditor}>
               <i className='material-icons'>add</i>
            </a>
          </div>
        </div>
        {filterConditionExplorer}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      searchStatus: state.search,
      chartFilterStatus: state.chartFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectAngkeiteu: (angkeiteu) => {
      return dispatch(selectAngkeiteu(angkeiteu));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuChartFilter);
