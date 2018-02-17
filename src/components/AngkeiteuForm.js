import React from 'react'
import PropTypes from 'prop-types'
import { ImageUpload, AngkeiteuHeader } from 'components'

class AngkeiteuForm extends React.Component {
  render() {
    const {triggerOption, title, description, option_desc, options,
           handleChange, handleAddOption, handleRemoveOption,
           handlePost, handleUpload, postedData} = this.props
    const mapToOptions = (options) => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option.id}>
            <div className='col s10'>
              <input name='optionGroup'
                     type='radio'
                     disabled='disabled'/>
              <label>{option.description}</label>
            </div>
            <div className='col s2'>
              <a className="waves-effect waves-light btn"
                 onClick={() => handleRemoveOption(option.id)}>
                <i className="material-icons center">close</i>
              </a>
            </div>
            <div className='input-field col s12'>
              <ImageUpload objId={typeof postedData.options == 'undefined' ? '' : postedData.options[i]._id}
                           objKind='option'
                           onUpload={handleUpload}/>
            </div>
          </div>
        );
      });
    }

    return (
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <AngkeiteuHeader type='CREATING'
                             mode={triggerOption._id === '' ? 'RootAngkeiteu' : 'TargetAngkeiteu'}
                             description={triggerOption.description}/>
            <div className='card-content'>
              <div className='row'>
                <div className='input-field col s6'>
                  <label>Title</label>
                  <input name='title'
                         type='text'
                         className='validate'
                         onChange={handleChange}
                         value={title}>
                  </input>
                </div>
                <div className='input-field col s12'>
                  <label htmlFor="textarea1">Description</label>
                  <textarea id="textarea1"
                            name='description'
                            className="materialize-textarea validate"
                            onChange={handleChange}
                            value={description}>
                  </textarea>
                </div>
                <div className='input-field col s12'>
                  <ImageUpload objId={postedData._id || ''}
                               objKind='angkeiteu'
                               onUpload={handleUpload}/>
                </div>
              </div>
            </div>
            <div className='card-content'>
              options
            </div>
            <div className='card-content'>
              {mapToOptions(options)}
            </div>
            <div className='card-content'>
               <div className="row">
                   <div className="input-field col s6">
                      <label>New option</label>
                       <input name="option_desc"
                              type="text"
                              className="validate"
                              onChange={handleChange}
                              value={option_desc}>
                       </input>
                   </div>
                   <div className="input-field col s6">
                       <a className="btn waves-effect waves-light"
                          onClick={handleAddOption}>
                          <i className="material-icons center">add</i>
                       </a>
                   </div>
               </div>
            </div>
            <div className='card-content'>
              <div className='row'>
                <a className='btn-large waves-effect waves-light col s6 offset-s3'
                    onClick={handlePost}>
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

AngkeiteuForm.propTpes = {
  triggerOption: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  option_desc: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  handleRemoveOption: PropTypes.func.isRequired,
  handlePost: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  postedData: PropTypes.object.isRequired
}

export default AngkeiteuForm
