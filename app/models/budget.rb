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

class Budget < ActiveRecord::Base
  attr_accessible :budget_cash, :budget_sodexo, :month, :month_owner_id, :next_month_owner_id, :remaining_cash, :remaining_sodexo, :year
  
  belongs_to :month_owner, :class_name => "User", :foreign_key => "month_owner_id" 
  has_many :expenses
  
  before_create :set_default_values
  
  def self.create_next_month_budget(current_month_budget, new_month_values)
    budget = Budget.new
    
    budget.month = (current_month_budget.month == 12 ? 1 : current_month_budget.month + 1)
    budget.year = (current_month_budget.month == 12 ? current_month_budget.year + 1 : current_month_budget.year)
    budget.budget_cash = current_month_budget.remaining_cash + new_month_values["next_month_cash"].to_f
    budget.remaining_cash = budget.budget_cash
    budget.budget_sodexo = current_month_budget.remaining_sodexo + new_month_values["next_month_sodexo"].to_f
    budget.remaining_sodexo = budget.budget_sodexo
    budget.month_owner_id = new_month_values["next_month_owner_id"]
    budget.handed_over = false
    budget.created_at = Time.now
    budget.updated_at = Time.now
    
    current_month_budget.handed_over = true
    
    if budget.save! && current_month_budget.save!
      budget
    else
      nil
    end
    
  end
  
  def self.current_month_budget 
    # fetch the current month's budget instance
    budget = Budget.find(:first, :conditions => ["handed_over = ?", false])
    
    budget
  end
  
  def update_budget_on_new_expense(expense)
    # udpate budget instance based on the expense_type and amount
    if expense.payment_type == "Cash"
      self.remaining_cash = self.remaining_cash - expense.amount
    elsif expense.payment_type == "Sodexo"
      self.remaining_sodexo = self.remaining_sodexo - expense.amount
    end
    
    self.updated_at = Time.now
    
    # save the instance
    self.save!
  end
  
  def update_budget_on_update_expense(expense, old_amount, old_payment_type)
    
    # scenario 1 : when both type and amount are changed
    if expense.payment_type != old_payment_type && expense.amount != old_amount
      # adding the old amount to old type
      if old_payment_type == "Cash"
        self.remaining_cash += old_amount
      elsif old_payment_type == "Sodexo"
        self.remaining_sodexo += old_amount        
      end
      
      # deducting new amount from the new type
      if expense.payment_type == "Cash"
        self.remaining_cash -= expense.amount
      elsif expense.payment_type == "Sodexo"
        self.remaining_sodexo -= expense.amount
      end
    end
    
    # scenario 2 : when only payment_type is modified
    if expense.payment_type != old_payment_type && expense.amount == old_amount
      # add amount to old type and deduct from new type
      # addition
      if old_payment_type == "Cash"
        self.remaining_cash += old_amount
      elsif old_payment_type == "Sodexo"
        self.remaining_sodexo += old_amount        
      end
      
      # deduction
      if expense.payment_type == "Cash"
        self.remaining_cash -= old_amount
      elsif expense.payment_type == "Sodexo"
        self.remaining_sodexo -= old_amount
      end
    end
    
    # scenario 3 : when only amount is modified
    if expense.amount != old_amount && expense.payment_type == old_payment_type
      # deduct difference from the respective type
      
      diff = expense.amount - old_amount
      
      if old_payment_type == "Cash"
        self.remaining_cash -= diff
      elsif old_payment_type == "Sodexo"
        self.remaining_sodexo -= diff
      end
    end
    
    self.updated_at = Time.now
    
    # scenario 4 : when nothing is modified !!
    # do nothing !!
    
    # TODO : Fix method code to return true / false based on save results
    # save the instance     
    if self.save!
      true
    else
      false
    end
  end
  
  def set_default_values
    self.created_at = Time.now
    self.updated_at = Time.now
  end
  
end
