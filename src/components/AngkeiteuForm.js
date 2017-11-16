import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

class AngkeiteuForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      title: props.title,
      description: '',
      option_desc: '',
      options: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleAddOption() {
    let nextState = {};
    let optionId = this.state.option_desc;
    let optionDesc = this.state.option_desc;
    let duplicatedOption = this.state.options.find((option)=>{
      return option.description === optionDesc;
    });

    if(optionDesc === '')
      return;
    if(typeof duplicatedOption !== 'undefined')
      return;

    nextState = update(this.state, {
        option_desc: { $set: '' },
        options: {
            $push: [{id: optionId, description: optionDesc}]
        }
    });
    this.setState(nextState);
  }

  handleRemoveOption(optionId) {
    let nextState = {};
    let optionIdx = this.state.options.findIndex((option)=>{
      return option.id === optionId;
    });

    nextState = update(this.state, {
        options: {
          $splice: [[optionIdx, 1]]
        }
    });
    this.setState(nextState);
  }

  handleCreateSubAngkeiteu(optionId) {
    //to implement
    let data = {
      title: this.state.title,
      optionId
    }
    this.props.onCreateSubAngkeiteu(data);
  }

  render() {
    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option.id}>
            <div className='col s8'>
              <input name='optionGroup'
                     type='radio'
                     disabled='disabled'/>
              <label htmlFor='test1'>{option.description}</label>
            </div>
            <div className='col s2'>
              <a className='waves-effect waves-light btn'
                 onClick={() => this.handleCreateSubAngkeiteu(option.id)}>
                <i className='material-icons cneter'>note_add</i>
              </a>
            </div>
            <div className='col s2'>
                <a className="waves-effect waves-light btn"
                   onClick={() => this.handleRemoveOption(option.id)}>
                  <i className="material-icons center">close</i>
                </a>
            </div>
          </div>
        );
      });
    }

    const disabledInputTitle = (
      <div className='input-field col s6'>
          <label className='active'>Title</label>
        <input name='title'
               type='text'
               className='validate'
               disabled value={this.state.title}>
        </input>
      </div>
    );

    const abledInputTitle = (
      <div className='input-field col s6'>
        <label>Title</label>
        <input name='title'
               type='text'
               className='validate'
               onChange={this.handleChange}
               value={this.state.title}>
        </input>
      </div>
    );

    return (
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='header blue white-text center'>
              <div className='card-content'>
                NEW ANGKEITEU
              </div>
            </div>
            <div className='card-content'>
              <div className='row'>
                {this.state.parent === '' ? abledInputTitle: disabledInputTitle }
                <div className='input-field col s12'>
                  <label htmlFor="textarea1">Description</label>
                  <textarea id="textarea1"
                            name='description'
                            className="materialize-textarea validate"
                            onChange={this.handleChange}
                            value={this.state.description}>
                  </textarea>
                </div>
              </div>
            </div>
            <div className='card-content'>
              options
            </div>
            <div className='card-content'>
              {mapToOptions(this.state.options)}
            </div>
            <div className='card-content'>
               <div className="row">
                   <div className="input-field col s6">
                      <label>New option</label>
                       <input name="option_desc"
                              type="text"
                              className="validate"
                              onChange={this.handleChange}
                              value={this.state.option_desc}>
                       </input>
                   </div>
                   <div className="input-field col s6">
                       <a className="btn waves-effect waves-light"
                          onClick={this.handleAddOption}>
                          <i className="material-icons center">add</i>
                       </a>
                   </div>
               </div>
            </div>
            <div className='card-content'>
              <div className='row'>
                <a className='btn-large waves-effect waves-light col s6 offset-s3'
                    onClick={this.handlePost}>
                  <i className="material-icons center">create</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AngkeiteuForm;
