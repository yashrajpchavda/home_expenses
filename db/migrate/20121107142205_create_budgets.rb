class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.integer :month
      t.integer :year
      t.float :budget_cash
      t.float :remaining_cash
      t.float :budget_sodexo
      t.float :remaining_sodexo
      t.integer :month_owner_id
      t.integer :next_month_owner_id

      t.timestamps
    end
  end
end
