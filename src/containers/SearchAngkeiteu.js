import React from 'react';
import { connect } from 'react-redux';
import { angkeiteuSearchRequest } from 'actions/search';
import { SearchBar, List, Angkeiteu, LinkBtn } from 'components';

class SearchAngkeiteu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.angkeiteuSearchRequest(this.props.match.params.keyword);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <SearchBar/>
          </div>
          <div className='col s12'>
            <h5>search result</h5>
            <List data={this.props.searchStatus.result.data}>
              <Angkeiteu>
                <LinkBtn>open</LinkBtn>
              </Angkeiteu>
            </List>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      searchStatus: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuSearchRequest: (keyword) => {
      return dispatch(angkeiteuSearchRequest(keyword));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAngkeiteu);
