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
teams = [];
1.times do
  teams << Team.create(team_name: Faker::Team.name, description: Faker::LeagueOfLegends.quote )
end

users = []
15.times do
  user = User.create(first_name: Faker::Name.first_name , last_name: Faker::Name.last_name, email:Faker::Internet.safe_email , password: "password")
  users << user
  UsersTeams.create(user_id: user.id, team_id: teams.sample.id)
end

5.times do
  category = Faker::Hacker.adjective
  Project.create(team_id: teams.sample.id, title: Faker::Hacker.noun , description:Faker::Hacker.say_something_smart, key: category.slice(0,3), user_id: users.sample.id, category: category)
end

demo = User.create(first_name: "Test" , last_name: "User", email: "test@user.com" , password: "password")
UsersTeams.create(user_id: demo.id, team_id: teams.sample.id)
