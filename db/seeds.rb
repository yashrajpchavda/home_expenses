# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

# Seeds for users
User.delete_all
CSV.foreach("#{Rails.root}/db/data/users.csv") do | user |
  usr = User.new(:username => user[0], :password => user[1])
  usr.save
end

# Seeds for budgets
Budget.delete_all
CSV.foreach("#{Rails.root}/db/data/budgets.csv") do | budget |
  bdgt = Budget.new(:month => budget[0], :year => budget[1], :budget_cash => budget[2], :remaining_cash => budget[3], :budget_sodexo => budget[4], :remaining_sodexo => budget[5], :month_owner_id => budget[6])
  bdgt.save
end
