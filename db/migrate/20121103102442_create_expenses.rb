class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :expense_type
      t.text :description
      t.string :payment_type
      t.float :amount
      t.datetime :paid_date

      t.timestamps
    end
  end
end
