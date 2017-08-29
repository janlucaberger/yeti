import React from 'react';
import ReactDOM from 'react-dom'
import DraggablePreview from './draggable_preview';

class DraggableItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dragging: false
    }
    this.renderIssueClasses = this.renderIssueClasses.bind(this)
    this.renderCanvasClasses = this.renderCanvasClasses.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
  }

  renderIssueClasses(){
    if (this.state.dragging){
      return "backlog-item-container dragging"
    } else {
      return "backlog-item-container"
    }
  }

  renderCanvasClasses(){
    if (this.state.dragging){
      return "dragging-preview active"
    } else {
      return "dragging-preview"
    }
  }


  dragStart(id, sprintStatus) {
    return (event) => {
      console.log("drag start")
      console.log(this.node)
      this.setState({ dragging: true })
      const data = {
        issue_id: id,
        sprint: sprintStatus
      };
      // console.log(data)
      // let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
      // let ctx = canvas.getContext('2d');
      // ctx.fillText("Hello World!",10,50);
      // // ctx.fillStyle = 'rgb(200,0,255)';
      // ctx.fillRect(10, 10, 55, 50);
      // console.log()
      // event.dataTransfer.setDragImage(canvas, 10, 10)
      event.dataTransfer.setData('text', JSON.stringify(data));
    }
  }

  dragEnd(){
    this.setState({dragging: false})
  }


  render(){
    return(
      <div>
        <div
          className={this.renderIssueClasses()}
          onDragStart={this.dragStart(1, true)}
          onDragEnd={this.dragEnd}
          key={1}
          draggable={true}
          ref={ (node) => { this.node = node }}
          >
          TEST TEST

        </div>

      </div>
    )
  }

}

export default DraggableItem
