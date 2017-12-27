import React from 'react';
import { connect } from 'react-redux';
import { SearchBar, SelectBtn, List, Angkeiteu,
         AngkeiteuDetail, AngkeiteuChart, AngkeiteuComment} from 'components';
import { selectAngkeiteu, unselectAngkeiteu } from 'actions/angkeiteuExplorer';

class AngkeiteuExplorer extends React.Component {

componentWillReceiveProps(nextProps) {
  if(nextProps.angkeiteuExplorerStatus.selectedAngkeiteu !== this.props.angkeiteuExplorerStatus.selectedAngkeiteu) {
    $('#angkeiteuExplorer').scrollTop(0);
  }
}
  render() {
    const selectedAngkeiteuView = (
      <div>
        selected angkeiteu
        <AngkeiteuDetail data={this.props.angkeiteuExplorerStatus.selectedAngkeiteu}/>
        <AngkeiteuChart data={this.props.angkeiteuExplorerStatus.selectedAngkeiteu}/>
        {typeof this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id !== 'undefined' ?
          <AngkeiteuComment angkeiteuId={this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id}/> : undefined}
      </div>
    );

    const findAngkieteuView = (
      <div>
        <SearchBar/>
        <List mode='only s12' data={this.props.searchStatus.result.data}>
          <Angkeiteu>
            <SelectBtn onSelect={this.props.selectAngkeiteu}>open</SelectBtn>
          </Angkeiteu>
        </List>
      </div>
    )

    return (
      <div id='angkeiteuExplorer' className='row'>
        <div className='col s12'>
          <h5>AngkeiteuExplorer</h5>
        </div>
        <div className='col s12'>
          {typeof this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id === 'undefined' ?
           findAngkieteuView : selectedAngkeiteuView}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      angkeiteuExplorerStatus: state.angkeiteuExplorer,
      searchStatus: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectAngkeiteu: (angkeiteu) => {
      return dispatch(selectAngkeiteu(angkeiteu));
    },
    unselectAngkeiteu: () => {
      return dispatch(unselectAngkeiteu());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuExplorer);
