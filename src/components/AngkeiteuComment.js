import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { CommentForm, CommentList} from 'containers'

class AngkeiteuComment extends React.Component {
  render() {
    const {angkeiteuId} = this.props
    return (
      <Card>
        <CommentForm angkeiteuId={angkeiteuId}/>
        <CommentList angkeiteuId={angkeiteuId}/>
      </Card>
    )
  }
}

export default AngkeiteuComment
