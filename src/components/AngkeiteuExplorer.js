import React from 'react';
import { connect } from 'react-redux';
import { SearchBar, SelectBtn, List, Option, Angkeiteu,
         AngkeiteuDetail, AngkeiteuChart, AngkeiteuComment, ShowImgBtn} from 'components';
import { selectAngkeiteu, unselectAngkeiteu, selectOption, complete } from 'actions/angkeiteuExplorer';

class AngkeiteuExplorer extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let findedOption = this.props.angkeiteuExplorerStatus.selectedAngkeiteu.options.find((option) => {
      return option._id === e.target.value;
    });
    this.props.selectOption(findedOption);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.angkeiteuExplorerStatus.selectedAngkeiteu !== this.props.angkeiteuExplorerStatus.selectedAngkeiteu) {
      $('#angkeiteuExplorer').scrollTop(0);
    }
  }

  handleSubmit() {
    let {selectedAngkeiteu, selectedOption} = this.props.angkeiteuExplorerStatus;
    if(typeof selectedAngkeiteu._id !== 'undefined' && typeof selectedOption._id !== 'undefined') {
      this.props.complete();
    }
  }

  render() {
    const backBtn = (
        <a className='btn' onClick={this.props.unselectAngkeiteu}>
          back
        </a>
    );

    const selectedAngkeiteuView = (
      <div>
        <AngkeiteuDetail data={this.props.angkeiteuExplorerStatus.selectedAngkeiteu}>
          <List className='row'>
            <Option className='col s12'
                    handleChange={this.handleChange}
                    selectedOptionId={this.props.angkeiteuExplorerStatus.selectedOption._id}>
              <ShowImgBtn/>
            </Option>
          </List>
          <SelectBtn onSelect={this.handleSubmit}>
            {this.props.angkeiteuExplorerStatus.purpose}
          </SelectBtn>
        </AngkeiteuDetail>
        <AngkeiteuChart data={this.props.angkeiteuExplorerStatus.selectedAngkeiteu}/>
        {typeof this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id !== 'undefined' ?
          <AngkeiteuComment angkeiteuId={this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id}/> : undefined}
        {backBtn}
      </div>
    );

    const findAngkeiteuView = (
      <div>
        <SearchBar/>
        <List className='row' data={this.props.searchStatus.result.data}>
          <Angkeiteu className='col s12'>
            <SelectBtn onSelect={this.props.selectAngkeiteu}>open</SelectBtn>
          </Angkeiteu>
        </List>
      </div>
    );

    return (
      <div className='row'>
        <div className='col s12 center'>
          <h5>AngkeiteuExplorer</h5>
        </div>
        <div className='col s12'>
          {typeof this.props.angkeiteuExplorerStatus.selectedAngkeiteu._id === 'undefined' ?
           findAngkeiteuView : selectedAngkeiteuView}
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
    },
    selectOption: (option) => {
      return dispatch(selectOption(option));
    },
    complete: () => {
      return dispatch(complete());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AngkeiteuExplorer);
