import React from 'react';
import GlobalNavButton from './global_nav_button';
import { logout } from '../../actions/session_actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showModal } from '../../actions/ui_actions';
import NewIssueForm from '../issues/new_issue_form'
import UserPopup from '../global/user_popup'


class GlobalNavContainer extends React.Component {
  constructor(props){
    super(props);

    this.createNewIssue = this.createNewIssue.bind(this);
    this.showUserPopup = this.showUserPopup.bind(this);
  }

  createNewIssue(){
    this.props.showModal(NewIssueForm);
  }

  showUserPopup(){
    this.props.showModal(UserPopup, {lowerCorner: "lower-corner"})
  }

  render(){
    return(
      <div className='global-nav-container'>
        <div className='global-nav-button-container'>
          <GlobalNavButton link={this.props.logout} icon="search" size="1"/>
          <button onClick={() => this.createNewIssue()} >NEW ISSUE</button>

        </div>
        <div className='global-nav-button-container align-bottom'>
          <GlobalNavButton link={""} icon="plus" size="1" />
          <button onClick={this.showUserPopup} >Test</button>
        </div>
      </div>
    )
  }

}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
    showModal: (component, props) => dispatch(showModal(component, props)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(GlobalNavContainer))
