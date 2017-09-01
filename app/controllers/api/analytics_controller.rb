class Api::AnalyticsController < ApplicationController

  def team_activity
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
    render "/api/analytics/team_activity"
  end

  def assigned_issues
    @issues = Issue.where("assigned_user_id = ?", current_user.id)
    render "/api/analytics/assigned_issues"
  end


  def data
    @count_priority = Issue.all
      .joins(:project)
      .where(resolution: "unresolved")
      .where("team_id = ?", current_team.id)
      .group(:priority_type_id)
      .count

    @count_type = Issue.all
      .joins(:project)
      .where(resolution: "unresolved")
      .where("team_id = ?", current_team.id)
      .group(:issue_type_id)
      .count

    @count_project = Issue.all
      .joins(:project)
      .where(resolution: "unresolved")
      .where("team_id = ?", current_team.id)
      .group(:project_id)
      .count

    render "/api/analytics/data"
  end

end
