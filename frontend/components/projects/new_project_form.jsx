import React from 'react';

class NewProjectForm extends React.Component {
  constructor(){
    super()

    this.state = {
      title: "",
      description: "",
      key: "",
      category: "",
      url: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key){
    return (e) => {
      this.setState({
        [key]: e.currentTarget.value
      })
    }
  }

  render(){
    return(
      <div className="new-item-form-container">
        <div className="new-item-form-header">
          <h3>Create Project</h3>
        </div>
        <div className="new-item-form-content">
          <label className="new-item-form-label">Title</label>
          <input type="text" className="new-item-form-input" value={this.state.title} onChange={this.handleChange("title")} />
          <label className="new-item-form-label">Description</label>
          <input type="text" className="new-item-form-input" value={this.state.description} onChange={this.handleChange("description")} />
          <label className="new-item-form-label">Key</label>
          <input type="text" className="new-item-form-input" value={this.state.key} onChange={this.handleChange("key")} />
          <label className="new-item-form-label">Category</label>
          <input type="text" className="new-item-form-input" value={this.state.category} onChange={this.handleChange("category")} />
        </div>
      </div>
    )
  }
}

export default NewProjectForm
