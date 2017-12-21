import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ImageView } from 'components';

class ShowImgBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImagePath :''
    }
    this.handleOnShowImgModal = this.handleOnShowImgModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.imageFileGetStatus.data !== this.props.imageFileGetStatus.data) {
      if(nextProps.imageFileGetStatus.data !== null && nextProps.imageFileGetStatus.data.connectedObj.id === this.props.objId) {
        let nextState = {};
        nextState['uploadedImagePath'] = nextProps.imageFileGetStatus.data.path;
        this.setState(nextState);
      }
    }
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  handleOnShowImgModal() {
    $(`#${this.props.objId}_showImgModal`).modal('open');
  }

  render() {
    const showImgModal = (
      <div id={`${this.props.objId}_showImgModal`} className='modal'>
        <div className='modal-content'>
          <ImageView objId={this.props.objId} height={500} width={500}/>
        </div>
      </div>
    );

    return (
      <div>
        <a className='waves-effect waves-light btn'
           disabled={this.state.uploadedImagePath === ''? 'disabled': undefined}
           onClick={this.handleOnShowImgModal}>
          <i className='material-icons center'>image</i>
        </a>
        {showImgModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      imageFileGetStatus: state.file.get
    };
};

export default connect(mapStateToProps)(ShowImgBtn);
