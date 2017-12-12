import React from 'react';
import PropTypes from 'prop-types';
import CommentForm from 'components';

class ImageView extends React.Component {

  componentDidMount() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }

  render() {
    let {src, height, width, onRemoveClick} = this.props;

    let defaults = {
      height: height || 100,
      width: width || 100,
    };

    return (
      <div>
        <img className='materialboxed responsive-img' src={src} {...defaults}/>
        {typeof onRemoveClick !== 'undefined' ? <a className='btn' onClick={onRemoveClick}>remove</a> :undefined}
      </div>
    );
  }
}



export default ImageView;
