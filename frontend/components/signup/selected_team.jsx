import React from 'react';


const SelectedTeam = ({team}) =>{

  if(team){
    return(
      <div className="selected-team-container">
        <h3>Your Team</h3>
        <h2>{team.team_name}</h2>
        <img src={team.avatar} width="50px" />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }

}

export default SelectedTeam
