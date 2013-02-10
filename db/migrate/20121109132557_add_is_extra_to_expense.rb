class AddIsExtraToExpense < ActiveRecord::Migration
  def change
    add_column :expenses, :is_extra, :boolean
  end
end
