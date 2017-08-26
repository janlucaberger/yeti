import React from 'react';




class ProjectSprintWidget extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selected: false
    }
    this.issue = this.props.issue
    this.renderStyles = this.renderStyles.bind(this)
    this.hideWidget = this.hideWidget.bind(this)
  }

  renderStyles(){
    if(this.state.selected){
      return "project-sprint-widget-container widget-hide"
    } else {
      return "project-sprint-widget-container"
    }
  }

  hideWidget(){
    this.setState({
      selected: true
    })
  }

  render(){
    debugger
    if(this.props.issue){
      return(
        <div onDragStart={this.props.ondrag} draggable={true} className={this.renderStyles()}>
          <div className="project-sprint-summary">
            {this.issue.summary}
          </div>
          <div className="project-sprint-secondary">
            <div>{this.issue.key}</div>
            <img width="16px" height="19px" src={this.props.priorityTypes[this.issue.priority_type_id].icon_url} />
          </div>
        </div>
      )
    } else {
      return <div></div>
    }

  }

}

export default ProjectSprintWidget;
