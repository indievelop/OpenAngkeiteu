import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import update from 'react-addons-update'
import { AngkeiteuForm } from 'components'
import { angkeiteuPost, angkeiteuPostRequest } from 'actions/angkeiteu'

class AngkeiteuFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      option_desc: '',
      options: [],
      finishUploads: [],
      postedData: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleRemoveOption = this.handleRemoveOption.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.initFormData = this.initFormData.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.triggerOption._id !== this.props.triggerOption._id) {
      this.initFormData()
    }
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleAddOption() {
    let nextState = {}
    let optionId = this.state.option_desc
    let optionDesc = this.state.option_desc
    let duplicatedOption = this.state.options.find((option)=>{
      return option.description === optionDesc
    })

    if(optionDesc === '')
      return
    if(typeof duplicatedOption !== 'undefined')
      return

    nextState = update(this.state, {
        option_desc: { $set: '' },
        options: {
            $push: [{id: optionId, description: optionDesc}]
        }
    })
    this.setState(nextState)
  }

  handleRemoveOption(optionId) {
    let nextState = {}
    let optionIdx = this.state.options.findIndex((option)=>{
      return option.id === optionId
    })

    nextState = update(this.state, {
        options: {
          $splice: [[optionIdx, 1]]
        }
    })
    this.setState(nextState)
  }

  initFormData() {
    let nextState = {}
    nextState['title'] = ''
    nextState['description'] = ''
    nextState['option_desc'] = ''
    nextState['options'] = []
    nextState['finishUploads'] = []
    this.setState(nextState)
  }

  handlePost() {
    let title = this.state.title
    let description = this.state.description
    let options = this.state.options
    let triggerOptionId = this.props.triggerOption._id
    const angkeiteuPostErrorMessage = [
      'You are not logged in.',
      'Please write title.',
      'Please write description.',
      'Please add option.',
      'Wrong triggerOption id.'
    ]

    this.props.angkeiteuPostRequest(title, description, options, triggerOptionId).then(() => {
      if(this.props.postStatus.status === 'SUCCESS') {
        //this.initFormData()
        this.setState({postedData: this.props.postStatus.data})
      } else if(this.props.postStatus.status === 'FAILURE'){
        let $toastContent = $('<span style="color: #FFB4BA">' + angkeiteuPostErrorMessage[this.props.postStatus.error-1] + '</span>')
        Materialize.toast($toastContent, 2000)
      }
    })
  }

  handleUpload(objId) {
    let nextState = {}

    if(this.state.finishUploads.length === this.state.options.length) {
      //finish uploads
      this.props.history.push(`/readAngkeiteu/${this.state.postedData._id}`)
    } else {
      nextState['finishUploads'] = this.state.finishUploads
      nextState['finishUploads'].push(objId)
      this.setState(nextState)
    }
  }

  render() {
    const {triggerOption} = this.props
    const {title, description, option_desc, options, postedData} = this.state
    const {handleChange, handleAddOption, handleRemoveOption,
           handlePost, handleUpload} = this
    return (
      <AngkeiteuForm {...{triggerOption,
                          title, description, option_desc, options, postedData,
                          handleChange, handleAddOption, handleRemoveOption,
                          handlePost, handleUpload}}/>

    )
  }
}

AngkeiteuFormContainer.propTpes = {
  triggerOption: PropTypes.object,
  history: PropTypes.object.isRequired
}

AngkeiteuFormContainer.defaultProps = {
  triggerOption: {
    _id: ''
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.angkeiteu.post,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuPost: () => {
      return dispatch(angkeiteuPost())
    },
    angkeiteuPostRequest: (title, description, options, triggerOptionId) => {
      return dispatch(angkeiteuPostRequest(title, description, options, triggerOptionId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuFormContainer)
