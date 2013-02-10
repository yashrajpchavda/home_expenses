# == Schema Information
#
# Table name: expenses
#
#  id           :integer          not null, primary key
#  expense_type :string(255)
#  description  :text
#  payment_type :string(255)
#  amount       :float
#  paid_date    :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer
#  budget_id    :integer
#  is_extra     :boolean
#

require 'test_helper'

class ExpenseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
