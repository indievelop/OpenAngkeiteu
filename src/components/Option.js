import React from 'react';
import PropTypes from 'prop-types';

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.renderBtnChildren = this.renderBtnChildren.bind(this);
  }

  renderBtnChildren() {
    return React.Children.map(this.props.children, child => {
      let cloneElement = React.cloneElement(child, {
        'data': this.props.data
      });
      return <div className='col s2'>{cloneElement}</div>
    });
  }

  render() {
    let { name, data, accountParticipation, handleChange, selectedOptionId } = this.props;

    return (
      <div className='row'>
        <div className='col s8'>
          <input name={name}
                 type='radio'
                 onChange={handleChange}
                 checked={typeof accountParticipation === 'undefined' ?
                          selectedOptionId === data._id :
                           accountParticipation.selectedOptionId === data._id}
                 disabled={typeof accountParticipation !== 'undefined'}
                 value={data._id}
                 id={data._id}/>
          <label htmlFor={data._id}>{data.description}</label>
        </div>
        {this.renderBtnChildren()}
      </div>
    );
  }
}

export default Option;
