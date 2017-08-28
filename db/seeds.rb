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

# 5.times do
#   category = Faker::Hacker.adjective
#   Project.create(team_id: teams[0].id, title: Faker::Hacker.noun , description:Faker::Hacker.say_something_smart, key: category.slice(0,3), user_id: users.sample.id, category: category)
# end


# PROJECTS
eng_project = Project.create(team_id: teams[0].id, title: "Engineering" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Sales" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Product" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")
Project.create(team_id: teams[0].id, title: "Marketing" , description:Faker::Hacker.say_something_smart, key: "ENG", user_id: users.sample.id, category: "New York")


#ENGINEERING ISSUES


Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Server error 232 on request behind MaxCDN networks" , description: "Test description 1" ,priority_type_id:4, issue_type_id: 2 , status_type_id: 1, key: eng_project.key)
Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Fix bug in signup auth flow" , description: "Test description 1" ,priority_type_id:4, issue_type_id: 1 , status_type_id: 2, key: eng_project.key)
Issue.create(project_id: eng_project.id , assigned_user_id: users.sample.id, summary: "Set meeting for mobile web requirements" , description: "Test description 1" ,priority_type_id:1, issue_type_id: 4 , status_type_id: 1, key: eng_project.key)





# DEMO USERS
demoUser1 = User.create(first_name: "Test" , last_name: "User", email: "test@user.com" , password: "password")
demoUser2 = User.create(first_name: "Hello" , last_name: "Goyeti", email: "hello@goyeti.io" , password: "password")
UsersTeams.create(user_id: demoUser1.id, team_id: teams[0].id)
UsersTeams.create(user_id: demoUser2.id, team_id: teams[0].id)
