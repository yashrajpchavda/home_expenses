# == Schema Information
#
# Table name: budgets
#
#  id                  :integer          not null, primary key
#  month               :integer
#  year                :integer
#  budget_cash         :float
#  remaining_cash      :float
#  budget_sodexo       :float
#  remaining_sodexo    :float
#  month_owner_id      :integer
#  next_month_owner_id :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  handed_over         :boolean          default(FALSE)
#

require 'test_helper'

class BudgetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
