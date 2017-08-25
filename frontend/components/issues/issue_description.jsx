import React from 'react';
import ReactQuill from 'react-quill';


class IssueDescription extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      initial_text: this.props.currentDescription,
      text: this.props.currentDescription,
      display: "none",
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.createMarkup = this.createMarkup.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  showEditor(){
    this.setState({ display: "block"})
  }

  hideEditor(){
    this.setState({ display: "none"})
  }

  createMarkup(){
    return { __html: this.state.initial_text}
  }

  handleSubmit(){

    this.props.updateIssue("description", this.state.text)
    this.setState({ initial_text: this.state.text},
      () => this.hideEditor()
    )
  }


  render() {
    return (
      <div className="issue-description-container">

        <div
          className="issue-description-preview"
          dangerouslySetInnerHTML={this.createMarkup()}
          contentEditable="true" onFocus={this.showEditor}
        />
        <div className="issue-description-editor" style={{display: this.state.display}}>
          <ReactQuill value={this.state.text}
          onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Confirm</button>
          <button onClick={this.hideEditor}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default IssueDescription