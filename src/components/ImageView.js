import React from 'react';

class ImageView extends React.Component {
  componentDidMount() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }

  render() {
    let {src, height, width} = this.props;

    let defaults = {
      height: height || 100,
      width: width || 100,
    };

    return (
      <img className="materialboxed responsive-img" src={src} {...defaults} />
    );
  }
}

export default ImageView;
