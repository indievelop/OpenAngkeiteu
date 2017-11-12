import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSearchView, angkeiteuSearchRequest } from 'actions/search';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        keyword: ''
      };

      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleOnClick = this.handleOnClick.bind(this);
      //LISTEN ESC KEY, CLOSE IF PRESSED
      const listenEscKey = (evt) => {
        evt = evt || window.event;
        if(evt.keyCode === 27) {
          this.handleClose();
        }
      };
      document.onkeydown = listenEscKey;
    }

    handleClose() {
      this.handleSearch('');
      document.onkeyDown = null;
      this.props.closeSearchView();
    }

    handleChange(e) {
      this.setState({
        keyword: e.target.value
      });
      this.handleSearch(e.target.value);
    }

    handleKeyDown(e) {
      if(e.keyCode === 13) {
        if(this.props.searchStatus.result.data.length > 0) {
          this.props.history.push('/searchAngkeiteu/'+this.props.searchStatus.result.data[0].title);
          this.props.closeSearchView();
        }
      }
    }

    handleSearch(keyword) {
      if(keyword === '')
        return
      this.props.angkeiteuSearchRequest(keyword);
    }

    handleOnClick(e) {
      this.props.history.push('/searchAngkeiteu/'+e.target.name);
      this.props.closeSearchView();
    }

    render() {
      const mapDataToLinks = (data) => {
        return data.map((angkeiteu, i) => {
          return (
            <li key={angkeiteu._id}>
              <a name={angkeiteu.title} onClick={this.handleOnClick}>
                 {angkeiteu.title}
              </a>
            </li>
          );
        });
      };

      return (
        <div className='search-screen white-text'>
          <div className='right'>
            <a className='waves-effect waves-light btn red lighten-1'
                onClick={this.handleClose}>
                close
            </a>
          </div>
          <div className='container'>
            <input placeholder='Search a angkeiteu'
                   value={this.state.keyword}
                   onChange={this.handleChange}
                   onKeyDown={this.handleKeyDown}>
            </input>
            <ul className='search-results'>
              { mapDataToLinks(this.props.searchStatus.result.data) }
            </ul>
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
    },
    closeSearchView: () => {
      return dispatch(closeSearchView());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
