import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { angkeiteuSearchRequest } from 'actions/search';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        keyword: ''
      };

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
          this.handleSelectResult(this.props.searchStatus.result.data[0].title);
        }
      }
    }

    handleSearch(keyword) {
      if(keyword === '')
        return
      this.props.angkeiteuSearchRequest(keyword);
    }

    handleOnClick(e) {
      this.handleSelectResult(e.target.name);
    }

    handleSelectResult(title) {
      console.log(title);
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
          <div>
            <input placeholder='Search a angkeiteu'
                   value={this.state.keyword}
                   onChange={this.handleChange}
                   onKeyDown={this.handleKeyDown}>
            </input>
            <ul>
              { mapDataToLinks(this.props.searchStatus.result.data) }
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
