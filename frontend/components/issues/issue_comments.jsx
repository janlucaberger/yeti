import React from 'react';
import ReactQuill from 'react-quill'
import { connect } from 'react-redux';
import { getComments } from '../../reducers/selectors';
import TimeAgo from 'react-timeago';

class IssueComments extends React.Component {
  constructor(props) {
   super(props)
   this.state = { text: '' } // You can also pass a Quill Delta here
   this.handleChange = this.handleChange.bind(this)
   this.mapComments = this.mapComments.bind(this)
 }

 handleChange(value) {
   this.setState({ text: value })
 }

 mapComments(){
   return this.props.comments.map( comment => {
     return (
       <div className="issue-comment-container">
         <div className="issue-comment-author-container">
           <img className="issue-comment-avatar" src={this.props.users[comment.user_id].avatar} width="20px" />
           <div>{this.props.users[comment.user_id].first_name}&nbsp;{this.props.users[comment.user_id].last_name}</div>
           <div className="issue-comment-timestamp" > - <TimeAgo date={comment.created_at} /></div>
         </div>
         <div className="issue-comment-body">
           {comment.body}
         </div>
       </div>
     )
   }, this)
 }

 render() {
   return (
     <div>
       <ReactQuill value={this.state.text}
                   onChange={this.handleChange} />
      { this.mapComments() }

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


export default connect(mapStateToProps)(IssueComments)
