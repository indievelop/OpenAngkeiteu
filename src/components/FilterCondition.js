import React from 'react';
import { connect } from 'react-redux';
import { SelectBtn } from 'components';
import { removeChartFilterCondition } from 'actions/chartFilter';
import { init as initExplorer, selectAngkeiteu } from 'actions/angkeiteuExplorer';

class FilterCondition extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectAngkeiteu = this.handleSelectAngkeiteu.bind(this);
  }

  handleSelectAngkeiteu(data) {
    this.props.initExplorer('Add FilterCondtion');
    this.props.selectAngkeiteu(data.angkeiteu);
    $('#angkeiteuExplorerModal').modal('open');
  }

  render() {
    let {data} = this.props;

    return (
      <div className='row'>
        <div className='col s5'>
          <SelectBtn data={data} onSelect={this.handleSelectAngkeiteu}>
            {data.angkeiteu.title}
          </SelectBtn>
        </div>
        <div className='col s5'>
          {data.option.description}
        </div>
        <div className='col s2'>
          <SelectBtn className='btn'
                     data={data}
                     onSelect={this.props.removeChartFilterCondition}>
            <i className="material-icons center">close</i>
          </SelectBtn>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeChartFilterCondition: (filterCondition) => {
      return dispatch(removeChartFilterCondition(filterCondition));
    },
    initExplorer: (purpose) => {
      return dispatch(initExplorer(purpose));
    },
    selectAngkeiteu: (angkeiteu) => {
      return dispatch(selectAngkeiteu(angkeiteu));
    }
  };
};

export default connect (undefined, mapDispatchToProps)(FilterCondition);
