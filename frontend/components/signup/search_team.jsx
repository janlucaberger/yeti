import React from 'react';
import { connect } from 'react-redux';
import { getTeamsArray } from '../../reducers/selectors';
import { fetchTeamByName } from '../../actions/teams/teams_actions'

class SearchTeam extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      search_team_name: "",
      team_name: ""
    }

    this.handleTeamSearch = this.handleTeamSearch.bind(this)
    this.renderTeams = this.renderTeams.bind(this)
    this.selectTeam = this.selectTeam.bind(this)
    this.setPlaceholder = this.setPlaceholder.bind(this)
  }

  selectTeam(team_id, team_name){
    return (e) => {
      this.setState({
        search_team_name: "",
        team_name: team_name
      })
      this.props.setTeam(team_id)
    }

  }

  setPlaceholder(){
    if(this.state.team_name.length < 1){
      return "Find an existing team"
    } else {
      return this.state.team_name
    }
  }

  handleTeamSearch(e){
    e.preventDefault()
    this.setState({
      search_team_name: e.currentTarget.value
    })
    if (this.state.search_team_name.length >= 2){
      this.props.fetchTeams(this.state.search_team_name)
    }
  }

  renderTeams(){
    let teams;
    if(this.state.search_team_name.length < 2){
      teams = []
    } else {
      teams = this.props.teams
    }
    return teams.map((team) => {
      return (
        <div onClick={this.selectTeam(team.id, team.team_name)} className="form-dropdown-item-container" key={team.id}>
          <img className="form-dropdown-avatar"src={team.avatar} width="50px"/>
          <p className="form-text">{team.team_name}</p>
        </div>
      )
    })
  }
  render(){
    return(
      <div>
        <input
          value={this.state.search_team_name}
          className="form-text-input" name="team_name"
          placeholder={this.setPlaceholder()}
          onChange={this.handleTeamSearch}
        />
        <ul className="team-search-list-container">
          { this.renderTeams() }
        </ul>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return{
    teams: getTeamsArray(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: (teamname) => dispatch(fetchTeamByName(teamname))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTeam)
