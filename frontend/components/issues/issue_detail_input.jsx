import React from 'react'

class IssueDetailInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      display_confirmation: false,
      input: this.props.value
    }

    this.showConfirmBox = this.showConfirmBox.bind(this)
    this.hideConfirmBox = this.hideConfirmBox.bind(this)
    this.confirmBoxClass = this.confirmBoxClass.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.enterSubmit = this.enterSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      input: nextProps.value
    })
  }

  showConfirmBox(){
    this.setState({display_confirmation: true})
  }
  hideConfirmBox(){
    this.setState({
      display_confirmation: false,
      input: this.props.value
    })
    this.issueInput.blur()
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      input: e.currentTarget.value
    })
  }

  confirmBoxClass(){
    if(this.state.display_confirmation){
      return "confirmation-box-container active"
    } else {
      return "confirmation-box-container"
    }
  }

  enterSubmit(e){
    if(e.key === "Enter"){
      console.log("Enter pressed!")
      this.handleSubmit()
    }
  }

  handleSubmit(){

    if(this.state.value !== this.props.value){
      this.props.updateIssue(this.props.changeKey, this.state.input)
    }
    this.hideConfirmBox()
    this.issueInput.blur()
  }

  render(){
    return(
      <div className="issue-detail-form-container">
        <input
          ref={(input) => { this.issueInput = input}}
          onChange={this.handleChange}
          onFocus={this.showConfirmBox}
          onBlur={this.hideConfirmBox}
          onKeyPress={this.enterSubmit}
          className={this.props.className}
          value={this.state.input}
        />
        <div className={this.confirmBoxClass()}>
          <div onClick={this.handleSubmit} className="confirm-box ">
            <img src="https://s3.amazonaws.com/yetiapp-assets/checkmark.png" width="15px"/>
          </div>
          <div onClick={this.hideConfirmBox} className="confirm-box">
            <img src="https://s3.amazonaws.com/yetiapp-assets/xmark.png" width="15px"/>
          </div>
        </div>
      </div>
    )
  }
}

export default IssueDetailInput
