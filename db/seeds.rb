# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Team.destroy_all
User.destroy_all
Project.destroy_all
Issue.destroy_all
IssueAudit.destroy_all
Sprint.destroy_all
IssueType.destroy_all
StatusType.destroy_all
PriorityType.destroy_all


issue_types = []
issue_types << IssueType.create(issue_type: "Task", icon: File.new("app/assets/images/icons/task_icon.png"))
issue_types << IssueType.create(issue_type: "Story", icon: File.new("app/assets/images/icons/story_icon.png"))
issue_types << IssueType.create(issue_type: "Bug", icon: File.new("app/assets/images/icons/bug_icon.png"))
issue_types << IssueType.create(issue_type: "Epic", icon: File.new("app/assets/images/icons/epic_icon.png"))

priority_types = []
priority_types << PriorityType.create(priority_type: "High", icon: File.new("app/assets/images/icons/high_pri.png"))
priority_types << PriorityType.create(priority_type: "Medium", icon: File.new("app/assets/images/icons/medium_pri.png"))
priority_types << PriorityType.create(priority_type: "Low", icon: File.new("app/assets/images/icons/low_pri.png"))
priority_types << PriorityType.create(priority_type: "Lowest", icon: File.new("app/assets/images/icons/lowest_pri.png"))

status_types = []
status_types << StatusType.create(status_type: "Todo")
status_types << StatusType.create(status_type: "In Progress")
status_types << StatusType.create(status_type: "Done")

teams = []
1.times do
  teams << Team.create(team_name: Faker::Team.name, description: Faker::LeagueOfLegends.quote )
end

users = []
4.times do
  user = User.create(first_name: Faker::Name.first_name , last_name: Faker::Name.last_name, email:Faker::Internet.safe_email , password: "password")
  users << user
  UsersTeams.create(user_id: user.id, team_id: teams[0].id)
end



# PROJECTS
eng_project = Project.create(team_id: teams[0].id, title: "Engineering" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Sales" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Product" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Marketing" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")

issues = []
#ENGINEERING ISSUES

issues << Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Server error 232 on request behind MaxCDN networks" , description: "Test description 1" ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)
issues << Issue.create(sprint:true, project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Fix bug in signup auth flow" , description: "Test description 1" ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)
issues << Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Set meeting for mobile web requirements" , description: "Test description 1" ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)

issues << Issue.create(sprint:true, project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Add anonymous read access support for docker repositories" , description: "Users would like to have anonymous read (pull) access to docker repositories in Nexus. This helps consume and share docker images more easily by not requiring a specific login. This is analogous to the benefits offered by anonymous access by other formats.
As an end user, I don't want to have to configure authentication for read only access to docker repositories. Docker hub does not require this, and neither should Nexus Repository Manager.
According to this comment from a Docker developer the correct way to do this would be to implement token authentication, and to have Nexus hand out tokens for anonymous access:
<a href='https://github.com/docker/docker/issues/24129#issuecomment-230610547' >Github</a>
There might also be a simpler implementation that should be considered for blanket anonymous access to a repository." ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)

issues << Issue.create(sprint:true, project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Remove snapshots from Maven repository remove if released option may progress slowly" , description: "The maven snapshot removal task is doing more work than expected. Expected that it would look at the snapshots in the snapshot repo and then check whether those exist in release repos. Instead it seems to be looking in other repos and checking whether those components exist in the snapshot repo.
Steps to reproduce:
Create a new maven snapshot repo and add one 0.0.1-SNAPSHOT version of a component.
Configure the snapshot removal task with minimum snapshot count 1 and remove if released enabled with a grace period 1 day.
Run the task with debug logging enabled.
Expected:
The snapshot would not be removed since it was just added, and there would be very little activity recorded in the log since there is just one snapshot in the repo and nothing to clean up.
Actual:
A whole bunch of debug log messages were recorded looking for components that do not exist in the snapshot repository. From the logs it looks like the task is iterating over other repositories, such as the central proxy, and checking whether those components exist in the snapshot repo." ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key:eng_project.key + " " +rand(1..100).to_s)

issues << Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Allow browse of repository storage via HTML index directory listing" , description: "Since the release of Nexus 3, some people still have expressed an interest in having a Browse Storage feature that works using basic HTML navigation.
Users of Nexus 2.x who just want to download a particular file for direct consumption often browse into the /content URL to locate what they want, click on it, and download it. This is a simple, very intuitive UI which can be used by end users who aren't very technical.
In Nexus 3 it is no longer possible to do this.
There are cases where you can download a file by requesting
This makes it intuitive if the directory listing would be given if you remove the filename from that url (However, currently that url returns 404)
Where it makes sense, consider allowing browsing of repositories via HTML directory listings." ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)


issues << Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "StoreJanitor cannot work with more than ~2 gb memory" , description: "StoreJanitor uses int for values of freememory, heapsize etc. So StoreJanitor cannot be used in environment with jvm heap bigger than 2,147,483,647 bytes." ,priority_type_id: priority_types.sample.id, issue_type_id: issue_types.sample.id , status_type_id: status_types.sample.id, key: eng_project.key + " " +rand(1..100).to_s)


# IssueAudit.create(user_id: users.sample.id, column_changed: "status_type_id", from: 2, to: 1, issue_id: issues.sample.id)





#SPRINT
now = Date.today
Sprint.create(start_date: now, end_date: (now + 14), project_id: eng_project.id, name: "SP 4")


##



# DEMO USERS
demoUser1 = User.create(first_name: "Test" , last_name: "User", email: "test@user.com" , password: "password")
demoUser2 = User.create(first_name: "Hello" , last_name: "Goyeti", email: "hello@goyeti.io" , password: "password")
UsersTeams.create(user_id: demoUser1.id, team_id: teams[0].id)
UsersTeams.create(user_id: demoUser2.id, team_id: teams[0].id)
