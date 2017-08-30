class Api::TeamsController < ApplicationController

  def index
    if params[:query].nil?
      @teams = Team.all
      render "/api/teams/index"
    elsif params[:query].include?(:similar)
      @teams = Team.by_name(params[:query][:similar]).to_a
      render "/api/teams/index"
    elsif params[:query].include?(:exact)
      @team = Team.find_by(team_name: params[:query][:exact])
      render "/api/teams/show"
    end
  end

  def create

    @team = Team.new(team_params)
    if @team.save
      render :show
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def destroy
    @team = Team.find(params[:id])
    @team.delete
    render :show
  end

  def update
    @team = Team.find(params[:id])
    if @team.update_attributes description: params[:team][:description]
      render :show
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def show
    @team = Team.find(params[:id])
  end

  def activity

    @activity = IssueAudit.find_by_sql(["
      SELECT DISTINCT ON
        (ia.issue_id)
        ia.id,
        ia.issue_id,
        ia.column_changed,
        ia.from,
        ia.to,
        ia.created_at,
        ia.user_id,
        u.first_name,
        u.last_name,
        i.id,
        i.summary,
        i.description
    FROM
        issue_audits AS ia
    JOIN
        issues AS i ON i.id = ia.issue_id
    JOIN
        users AS u ON u.id = ia.user_id
    JOIN
        projects AS p ON p.id = i.project_id
    WHERE
        p.team_id = ?
    ORDER BY
        ia.issue_id,
        ia.created_at DESC
    LIMIT
      3
    ", current_team.id])
    @issue_types = IssueType.all
    @status_types = StatusType.all
    @priority_types = PriorityType.all
    render "/api/teams/activity"
  end

  def users
    @users = User.joins(:users_teams).where( users_teams: {team_id: current_team.id} ).to_a
    render "/api/teams/users"
  end

  def recently_resolved
    # TODO: do this.
  end

  private
  def team_params
    params.require(:team).permit(:team_name, :description, :avatar)
  end

end
