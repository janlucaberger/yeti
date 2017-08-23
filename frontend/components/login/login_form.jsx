import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Form from './_form'

const mapStateToProps = state => {
  return {
    errors: state.session.errors
  }
}
const mapDispatchToProps = dispatch => {
  return {
    action: (user) => dispatch(login(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
