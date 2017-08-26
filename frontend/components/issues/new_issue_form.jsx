import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/ui_actions';

class NewIssueForm extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>New Issue</div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    closeModal: () => dispatch(hideModal()),
  }
}

export default connect(null, mapDispatchToProps)(NewIssueForm)
