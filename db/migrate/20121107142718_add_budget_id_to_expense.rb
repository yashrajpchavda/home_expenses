class AddBudgetIdToExpense < ActiveRecord::Migration
  def change
    add_column :expenses, :budget_id, :integer
  end
end
