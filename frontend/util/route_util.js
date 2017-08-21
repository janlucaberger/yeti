import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


const Protected = ({component: Component, path, loggedIn}) => {
  return(
    <Route
      path={path}
      render={ props => loggedIn ? <Component {...props}/>  : <Redirect to="/"
    />
  )
}










const mapStateToProps = (state) => {
  return{
    loggedIn: Boolean(state.current_user)
  }
}

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected))
