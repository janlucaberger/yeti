import React from 'react';
import ReactQuill from 'react-quill'
import { connect } from 'react-redux';
import { getComments } from '../../reducers/selectors';
import TimeAgo from 'react-timeago';
import { createComment } from '../../actions/issues/issues_actions';

class IssueComments extends React.Component {
  constructor(props) {
   super(props)
   this.state = { text: '' } // You can also pass a Quill Delta here
   this.handleChange = this.handleChange.bind(this)
   this.mapComments = this.mapComments.bind(this)
   this.addComment = this.addComment.bind(this)
   this.createMarkup = this.createMarkup.bind(this)
 }

  handleChange(value) {
   this.setState({ text: value })
  }

  addComment(){
    if(this.state.text.length > 0){
      this.props.createComment({
      issue_id: this.props.issueId,
      body: this.state.text,
      })
    }
  }

  createMarkup(text){
    return { __html: text}
  }

  mapComments(){
   return this.props.comments.map( comment => {
     return (
       <div className="issue-comment-container">
         <div className="issue-comment-author-container">
           <img className="issue-comment-avatar profile-icon" src={this.props.users[comment.user_id].avatar} width="30px" />
           <div>{this.props.users[comment.user_id].first_name}&nbsp;{this.props.users[comment.user_id].last_name}</div>
           <div className="issue-comment-timestamp" > - <TimeAgo date={comment.created_at} /></div>
         </div>
         <div className="issue-comment-body">
           <div dangerouslySetInnerHTML={this.createMarkup(comment.body)} />
         </div>
       </div>
     )
   }, this)
  }

 render() {
   return (
    <div>
      <ReactQuill value={this.state.text}
                   onChange={this.handleChange}
      />
      <button className="primary-button blue-background" onClick={this.addComment}>Post</button>
      <div className="issue-comments-container">
        { this.mapComments() }
      </div>
    </div>

   )
 }
}


const mapStateToProps = (state, ownProps) => {
  return{
    comments: getComments(state, ownProps.issueId),
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return{
    createComment: comment => dispatch(createComment(comment))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IssueComments)
