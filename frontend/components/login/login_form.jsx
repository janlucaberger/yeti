import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Form from './_form'

const mapDispatchToProps = dispatch => {
  return {
    action: (user) => dispatch(login(user))
  }
}


export default connect(null, mapDispatchToProps)(Form)
