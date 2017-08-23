import React from 'react';
import { connect } from 'react-redux';
import { createNewTeam } from '../../actions/teams/teams_actions';
import { fetchTeamnameCheck } from '../../actions/ui_actions';

class NewTeam extends React.Component {
  constructor(){
    super()

    this.state = {
      image_url: "",
      image_file: null,
      team_name: "",
      description: "",
      creatTeamButton: "Create Team!"
    }
    this.handleImageUrl = this.handleImageUrl.bind(this)
    this.renderAvatarPreview = this.renderAvatarPreview.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setSubmitButton = this.setSubmitButton.bind(this)
    this.renderValidation = this.renderValidation.bind(this)
    this.isCompletedForm = this.isCompletedForm.bind(this)
    this.checkTeamNameExists = this.checkTeamNameExists.bind(this)
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

  checkTeamNameExists(){
    const teamname = this.state.team_name
    this.props.checkTeamname(teamname)
  }

  handleChange(input){
    return (e) => {
      let userInput = e.currentTarget.value
      if(userInput.length > 0){
        const firstLetter = e.currentTarget.value.split("")[0].toUpperCase() || ""
        const remaining = e.currentTarget.value.split("").slice(1).join("")
        userInput = firstLetter + remaining
      }

      this.setState({
        [input]: userInput
      }, this.checkTeamNameExists)
    }
  }

  setSubmitButton(){
    if (this.props.teamnameTaken){
      return "form-button left inactive"
    } else if(this.state.team_name.length > 3){
      return "form-button left active"
    } else {
      return "form-button left inactive"
    }
  }

  isCompletedForm(){
    return (this.props.teamnameTaken) ? false : true;
  }

  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    const file = this.state.image_file;

    formData.append("team[team_name]", this.state.team_name);
    formData.append("team[description]", this.state.team_name);
    if (file) formData.append("team[avatar]", file);

    // const newTeamParams = {
    //   team_name: this.state.team_name,
    //   description: this.state.description,
    //   avatar: this.state.image_file
    // }
    if(this.isCompletedForm()){
      this.props.createTeam(formData).then(() => {
        this.setState({ creatTeamButton: "Team Created!"})
        this.props.setTeam(this.props.current_team.id)
      })
    }
  }

  renderValidation(type){
    if(this.props.teamnameTaken){
      return (
        <div className="input-validation-container">
          <p>Sorry this Teamname already exists!</p>
        </div>
      )
    }
  }

  renderAvatarPreview(){
    let src;
    if(this.state.image_url){
      src = this.state.image_url
    } else {
      src = "https://s3.amazonaws.com/yetiapp-assets/default_team_avatar.png"
    }
    return (
      <img className="form-dropdown-avatar" src={src} width="30px" height="30px"/>
    )
  }

  render(){
    return(
      <div className="new-team-container">

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange("team_name")} value={this.state.team_name} className="form-text-input" type="text" placeholder="Team Name"/>
            { this.renderValidation() }
          <input onChange={this.handleChange("description")} value={this.state.description} className="form-text-input" type="text" placeholder="Description"/>
          <div className="new-team-avatar-container">
            <div className="form-text">Choose an avatar:</div>
            {this.renderAvatarPreview()}
            <input onChange={this.handleImageUrl} type="file" placeholder="Choose Avatar" accept="image/*"/>
          </div>

          <button className={this.setSubmitButton()} onClick={this.handleSubmit}>{this.state.creatTeamButton}</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teamnameTaken: state.ui.team_name_exists,
    current_team: state.session.current_team
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTeam: (team) => dispatch(createNewTeam(team)),
    checkTeamname: (teamname) => dispatch(fetchTeamnameCheck(teamname)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam)
