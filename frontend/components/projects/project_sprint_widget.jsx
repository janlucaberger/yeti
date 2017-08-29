import React from 'react';
import {Link} from 'react-router-dom'

class ProjectSprintWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: false
    }
    this.issue = this.props.issue
    this.renderStyles = this.renderStyles.bind(this)
    this.hideWidget = this.hideWidget.bind(this)
    this.renderImage = this.renderImage.bind(this)
  }

  renderStyles() {
    if (this.state.selected) {
      return "project-sprint-widget-container widget-hide"
    } else {
      return "project-sprint-widget-container"
    }
  }

  hideWidget() {
    this.setState({selected: true})
  }

  renderImage(image){
    if(typeof image !== "undefined"){
      return <img width="16px" height="19px" src={image}/>
    }
  }

  render() {

    if (this.props.issue) {

      return (
        <Link to={`/issues/${this.issue.id}`}>
          <div onDragStart={this.props.ondrag} draggable={true} className={this.renderStyles()}>
            <div className="project-sprint-summary">
              {this.issue.summary}
            </div>
            <div className="project-sprint-secondary">
              <div>{this.issue.key}</div>

              {this.renderImage(this.props.priorityTypes[this.issue.priority_type_id].icon_url)}
            </div>
          </div>
        </Link>
      )
    } else {
      return <div></div>
    }

  }

}

export default ProjectSprintWidget;
