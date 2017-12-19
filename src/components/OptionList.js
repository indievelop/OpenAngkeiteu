import React from 'react';
import PropTypes from 'prop-types';
import { Option } from 'components';

class OptionList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOptionId: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    this.props.onChange(nextState);
  }

  render() {
    let {data, onChange, handleCreateTargetAngkeiteu } = this.props
    const mapToComponets = optionList => {
      return optionList.map((option, i) => {
        return (
          <div className='col s12'
               key={option._id}>
            <Option option={option}
                    accountParticipation={data.accountParticipation}
                    handleChange={this.handleChange}
                    handleCreateTargetAngkeiteu={handleCreateTargetAngkeiteu}
                    selectedOptionId={this.state.selectedOptionId}/>
          </div>
        );
      });
    }

    return (
      <div>
        {mapToComponets(data.options)}
      </div>
    );
  }
}

export default OptionList;
