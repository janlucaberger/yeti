import React from 'react'

class Form extends React.Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.demoLogin = this.demoLogin.bind(this)
    this.setSubmitButton = this.setSubmitButton.bind(this)
    this.isCompletedForm = this.isCompletedForm.bind(this)
    this.validEmail = this.validEmail.bind(this)
    this.renderErrors = this.renderErrors.bind(this)
    this.missingFormItems = this.missingFormItems.bind(this)
  }

  handleChange(input){
    return (e) => {
      this.setState({
        [input]: e.currentTarget.value
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.missingFormItems()
    if (this.isCompletedForm()){
      this.props.action(this.state)
    }
  }

  validEmail(){
    const email = this.state.email
    return (email.includes("@") && email.includes(".")) ? true : false
  }

  isCompletedForm(){
    let complete = true;
    const email = this.state.email
    if(!this.validEmail()){
      complete = false;
    } else if (this.state.password.length < 6){
      complete = false;
    }

    return complete;
  }

  demoLogin(e){
    e.preventDefault();
    const demoAccount = {
      email: "hello@goyeti.io",
      password: "password"
    }
    this.props.action(demoAccount)
  }

  setSubmitButton(){
    return (this.isCompletedForm()) ? "form-button right active" : "form-button right inactive"
  }

  missingFormItems(){
    const email = this.state.email
    const password = this.state.password
    let message;
    if(!this.validEmail() && password.length < 1){
      message = "Please enter valid email and password"
    } else if (!this.validEmail()){
      message = "Please enter valid email"
    } else if(password.length < 1) {
      message = "Please enter password"
    }
    return <div className="login-errors-container">{message}</div>
  }

  renderErrors(){
    const errors = this.props.errors
    if(errors === "undefined"){
      return <div></div>
    } else{
      return <div className="login-errors-container">{errors}</div>
    }
  }

  render(){
    console.log(this.props.errors)
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="form-text-input" placeholder="Email" onChange={this.handleChange("email")} value={this.state.email}/>
          <input className="form-text-input" placeholder="Password" type="password" onChange={this.handleChange("password")} value={this.state.password}/>
          <button className={this.setSubmitButton()}>Login</button>
          { this.renderErrors() }
          { this.missingFormItems() }
          <button onClick={this.demoLogin} className="form-button left">Demo Login</button>
        </form>
      </div>
    )
  }
}

export default Form
