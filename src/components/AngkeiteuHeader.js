import React from 'react';
import PropTypes from 'prop-types';

class AngkeiteuHeader extends React.Component {
  render() {
    let {type} = this.props;

    const pleaseHeader =  (
      <div className='header orange white-text center'>
        <div className='card-content'>
          Please response Angkeiteu.
        </div>
      </div>
    );

    const thankyouHeader = (
      <div className='header green white-text center'>
        <div className='card-content'>
          thank you for your participation.
        </div>
      </div>
    );

    const createHeader = (
      <div className='header blue white-text center'>
        <div className='card-content'>
          {this.props.mode === 'RootAngkeiteu' ?
            this.props.mode : this.props.description +" of "+ this.props.mode}
        </div>
      </div>
    );

    const header = () => {
      switch(type) {
        case 'PARTICIPATED':
          return(thankyouHeader);
        case 'UNPARTICIPATED':
          return(pleaseHeader);
        case 'CREATING':
          return(createHeader);
        default:
          return(null);
      }
    };

    return (
      <div>
        {header()}
      </div>
    );
  }
}

export default AngkeiteuHeader;
