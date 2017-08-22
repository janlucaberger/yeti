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
  }

  handleChange(input){
    return (e) => {
      console.log(e.currentTarget.value)
      this.setState({
        [input]: e.currentTarget.value
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="form-text-input" placeholder="Email" onChange={this.handleChange("email")} value={this.state.email}/>
          <input className="form-text-input" placeholder="Password" type="password" onChange={this.handleChange("password")} value={this.state.password}/>
          <button className="login-button">Login</button>
        </form>
      </div>
    )
  }
}

export default Form
