import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Link, withRouter } from 'react-router-dom';
import NewTeam from '../signup/new_team';
import SearchTeam from '../signup/search_team';
import { fetchEmailCheck } from '../../actions/ui_actions';
import { createUser } from '../../actions/users/user_actions';

class SignupContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      team_id: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.setTeam = this.setTeam.bind(this)
    this.isCompletedForm = this.isCompletedForm.bind(this)
    this.checkEmailExists = this.checkEmailExists.bind(this)
    this.renderValidation = this.renderValidation.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.validEmail = this.validEmail.bind(this)
    this.setSubmitButton = this.setSubmitButton.bind(this)
    this.emailInputClass = this.emailInputClass.bind(this)
  }

  handleChange(input){
    return (e) => {
      this.setState({
        [input]: e.currentTarget.value
      }, this.checkEmailExists)
    }

  }

  componentDidMount(){
    console.log("Signup container mounted")
  }

  setTeam(team_id){
    this.setState({ team_id })
  }

  setSubmitButton(){
    if (this.isCompletedForm()){
      return "form-button active"
    } else {
      return "form-button inactive"
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if (nextProps.loggedIn) {
  //     this.props.history.push('/');
  //   }
  // }

  validEmail(){
    const email = this.state.email
    if (this.props.emailTaken){
      return false;
    } else if (email.includes("@") && email.includes(".")){
      return true;
    } else {
      return false;
    }
  }

  checkEmailExists(){
    const email = this.state.email
    if(email.includes("@") && email.includes(".")){
      this.props.checkEmail(this.state.email)
    }
  }

  emailInputClass(){
    const email = this.state.email
    if(this.props.emailTaken) {
      return "form-text-input invalid"
    } else if (this.validEmail()){
      return "form-text-input valid"
    } else {
      return "form-text-input invalid"
    }
  }

  isCompletedForm(){
    let completed = true;
    Object.values(this.state).forEach((form_value) =>{
      if (form_value.length < 1) {
        completed = false;
      }
    })

    if(!this.validEmail()){
      completed = false
    }
    return completed
  }

  handleFormSubmit(e){
    e.preventDefault()
    if(this.isCompletedForm()){
      this.props.createUser(this.state)
    }
  }

  renderValidation(type){
    if(this.props.emailTaken){
      return (
        <div className="input-validation-container">
          <p>Email already exists! Want to <Link to="/login"><span className="blue">login?</span></Link></p>
        </div>

      )
    }
  }

  render(){
    console.log(`Form completed: ${this.isCompletedForm()}`)
    console.log(`email taken: ${this.props.emailTaken}`)
    return(
      <div className="signup-container blue-background">
        <div className="signup-form-container white-background">
          <div className="signup-content-container">
            <h2>Create an account</h2>
            <form onSubmit={this.handleFormSubmit}>
              <input className="form-text-input" type="text" name="first_name" placeholder="First Name"onChange={this.handleChange("first_name")} />
              <input className="form-text-input" type="text" name="last_name" placeholder="Last Name"onChange={this.handleChange("last_name")} />
              <input className={this.emailInputClass()} type="text" value={this.state.email} name="email" placeholder="Email"onChange={this.handleChange("email")} />
                { this.renderValidation("email") }
              <input className="form-text-input" type="password" name="password" placeholder="Password"onChange={this.handleChange("password")} />
            </form>
          </div>
          <div className="signup-content-container gray-background">
            <div className="signup-team-links">
              <div className="signup-team-link"><NavLink exact to="/signup">Join an existing team</NavLink></div>
              <div className="signup-team-link"><NavLink to="/signup/new_team">Create a new team</NavLink></div>
            </div>
              <Route exact path="/signup" render={() => <SearchTeam setTeam={this.setTeam} />}  />
              <Route exact path="/signup/new_team" component={NewTeam} />
              <button className={this.setSubmitButton()}>Create Account</button>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    emailTaken: state.ui.signup_email_exists,
    loggedIn: Boolean(state.session.current_user)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    checkEmail: (email) => dispatch(fetchEmailCheck(email)),
    createUser: (user) => dispatch(createUser(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupContainer))
