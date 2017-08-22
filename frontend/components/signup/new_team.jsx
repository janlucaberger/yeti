import React from 'react';


class NewTeam extends React.Component {
  constructor(){
    super()

    this.state = {
      image_url: "",
      image_file: null
    }
    this.handleImageUrl = this.handleImageUrl.bind(this)
    this.printState = this.printState.bind(this)
    this.renderAvatarPreview = this.renderAvatarPreview.bind(this)
  }

  handleImageUrl(e){
    const reader = new FileReader();
    debugger
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

  printState(){
    console.log(this.state.image_url)
  }

  renderAvatarPreview(){
    let src;
    if(this.state.image_url){
      src = this.state.image_url
    } else {
      src = "https://s3.amazonaws.com/yetiapp-assets/default_team_avatar.png"
    }
    return (
      <img className="form-dropdown-avatars" src={src} width="30px" height="30px"/>
    )
  }

  render(){
    console.log(this.state.image_url)
    return(
      <div className="new-team-container">
        
        <form>
          <input className="form-text-input" type="text" placeholder="Team Name"/>
          <input className="form-text-input" type="text" placeholder="Description"/>
          <label> Choose an avatar!<br/>
            {this.renderAvatarPreview()}
            <input onChange={this.handleImageUrl} type="file" placeholder="Choose Avatar" accept="image/*"/>
          </label>
        </form>
      </div>
    )
  }
}

export default NewTeam
