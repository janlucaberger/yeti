import React from 'react';

class IssueDetailStatus extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showOptions: false,
      current_type: "",
      current_type_icon: ""
    }
    this.showOptions = this.showOptions.bind(this)
    this.hideOptions = this.hideOptions.bind(this)
    this.closeOptions = this.closeOptions.bind(this)
    this.options = this.options.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      current_type_id: nextProps.value.id,
      current_type: nextProps.value.issue_type,
      current_type_icon: nextProps.issueTypes[nextProps.value.id].icon_url,
    })
  }

  showOptions(){
    this.setState({ showOptions: true})
    document.addEventListener("click", this.closeOptions)
  }

  hideOptions(){
    this.setState({ showOptions: false})
  }

  closeOptions(e){
    if(this.node.contains(e.target)){
      return;
    }
    this.hideOptions()
  }

  handleClick(id){
    return (e) => {
      e.stopPropagation();
      this.props.updateIssue("issue_type_id", id)
      this.hideOptions()
    }
  }

  options(){
    const mappedIssueTypes = Object.values(this.props.issueTypes).map((issueType) => {
      return(
        <li key={issueType.id} onClick={this.handleClick(issueType.id)} className="dropdown-option-container">
          <img width="20px" src={issueType.icon_url} />
          <span className="dropdown-option-text">{issueType.issue_type}</span>
        </li>
      )
    })
    if(this.state.showOptions){
      return(
        <ul className="dropdown-options">
          { mappedIssueTypes }
        </ul>
      )
    }
  }

  selectOption(){
    this.props.updateIssue(this.props.changeKey, this.state.issue_type_id)
  }

  componentWillUnmount(){
    document.removeEventListener("click", this.closeOptions)
  }

  render(){
    return(
      <div onFocus={this.showOptions} className="dropdown-container">
        <div>status</div>
        <div>
          <div className="dropdown-icon-placeholder">
            <img width="20px" src={this.state.current_type_icon}/>
          </div>
          <input
            ref={ node => {this.node = node}}
            className="dropdown-input"
            onClick={this.showOptions}
            value={this.state.current_type}
          />
        </div>
        { this.options() }
      </div>
    )
  }

}

export default IssueDetailStatus
