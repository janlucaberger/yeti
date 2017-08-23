import React from 'react';
import { hideModal } from '../../actions/ui_actions';
import { createNewProject } from '../../actions/projects/projects_actions';
import { connect } from 'react-redux';

class NewProjectForm extends React.Component {
  constructor(){
    super()

    this.state = {
      title: "",
      description: "",
      key: "",
      category: "",
      url: "",
      image_file: "",
      image_url: "",
      keyOveride: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setKey = this.setKey.bind(this)
    this.handleImageUrl = this.handleImageUrl.bind(this)
  }

  setKey(){
    const titleWords = this.state.title.split(" ");
    let key;
    if(titleWords.length > 1){
      //Grab the first two letters of the first two words
      key = titleWords[0].slice(0,1) + titleWords[1].slice(0,2)
    } else {
      key = titleWords[0].slice(0,3)
    }
    this.setState({
      key: key.toUpperCase()
    })
  }

  handleChange(key){
    return (e) => {
      this.setState({
        [key]: e.currentTarget.value
      }, () => {
        if (!this.state.keyOveride || this.state.key.length < 2){
          this.setKey()
        }
      })
    }
  }

  handleKeyInput(){
    return (e) => {
      this.setState({
        key: e.currentTarget.value.toUpperCase(),
        keyOveride: true
      })
    }
  }

  handleImageUrl(e){
    const reader = new FileReader();

    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      this.setState({ image_url: reader.result, image_file: file});
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ image_url: "", image_file: null });
    }
  }


  handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();
    const file = this.state.image_file;

    formData.append("project[title]", this.state.title);
    formData.append("project[description]", this.state.description);
    formData.append("project[key]", this.state.key);
    formData.append("project[category]", this.state.category);
    if (file) formData.append("project[avatar]", file);

    this.props.createNewProject(formData).then(() => {
      this.props.closeModal();
    })
  }


  renderAvatarPreview(){
    let src;
    if(this.state.image_url){
      src = this.state.image_url
    } else {
      src = "https://s3.amazonaws.com/yetiapp-assets/default_project_avatar.png"
    }
    return (
      <img className="form-dropdown-avatar" src={src} width="30px" height="30px"/>
    )
  }

  render(){
    return(
      <div className="new-item-form-container">
        <div className="new-item-form-header">
          <h3>Create Project</h3>
          <h5>Key: {this.state.key}</h5>
        </div>
        <div className="new-item-form-content">
          <label className="new-item-form-label">Title<span className="red">*</span></label>
          <input type="text" className="new-item-form-input" value={this.state.title} onChange={this.handleChange("title")} />
          <label className="new-item-form-label">Description</label>
          <input type="text" className="new-item-form-input" value={this.state.description} onChange={this.handleChange("description")} />
          <label className="new-item-form-label">Key<span className="red">*</span></label>
          <input type="text" className="new-item-form-input" value={this.state.key} onChange={this.handleKeyInput()} />
          <label className="new-item-form-label">Category<span className="red">*</span></label>
          <input type="text" className="new-item-form-input" value={this.state.category} onChange={this.handleChange("category")} />
            <div className="new-team-avatar-container">
              <h5>Choose an avatar: &nbsp; </h5>
              {this.renderAvatarPreview()}
              <input onChange={this.handleImageUrl} type="file" placeholder="Choose Avatar" accept="image/*"/>
            </div>
        </div>
        <div className="new-item-form-footer">
          <button className="secondary-button white-background" onClick={this.props.closeModal}>Cancel</button>
          <button className="primary-button blue-background" onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    closeModal: () => dispatch(hideModal()),
    createNewProject: (project) => dispatch(createNewProject(project))
  }
}

export default connect(null, mapDispatchToProps)(NewProjectForm)
