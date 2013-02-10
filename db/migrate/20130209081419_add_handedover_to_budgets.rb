class AddHandedoverToBudgets < ActiveRecord::Migration
  def change
    add_column :budgets, :handed_over, :boolean, :default => false
  end
end
