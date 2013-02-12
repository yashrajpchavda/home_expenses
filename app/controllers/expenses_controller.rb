class ExpensesController < ApplicationController
  def index
    
    result = Array.new
    #expenses = Expense.find(:all, :conditions => ["month(paid_date) = ? and year(paid_date) = ?", Time.now.month, Time.now.year])
    #expenses = Expense.all
    expenses = Budget.current_month_budget.expenses.find(:all, :order => "paid_date")
    
    session_user_id = session[:user_id]
    
    expenses.each{ |exp| result.push(exp.get_expense(session_user_id)) }
    
    render :json => result.to_json
  end

  def show
  end

  def create
    begin
      Expense.transaction do
        # updating current user's id
        params["expense"]["user_id"] = session[:user_id]
        
        # code to create the expense -------------------------
        expense = Expense.new
        
        # saving the expense, storing the returned value
        expense_saved = expense.save_it(params["expense"])
        
        # update budget only if expense is not extra
        if !expense.is_extra
          # code to update budget -------------------------
          # finding current month's budget instance 
          #budget = Budget.current_month_budget
          
          # updating budget instance based on changes made to the expense instance
          #budget_saved = budget.update_budget_on_new_expense(expense) if expense_saved
          budget_saved = Budget.find(expense.budget.id).update_budget_on_new_expense(expense) if expense_saved
        end
        
        # send the response to client
        if expense_saved && (expense.is_extra || budget_saved)
         render :json => { :status => "success", :message => "Saved Successfully ! Kick to fade me out !" }
        else
         render :json => { :status => "error", :nessage => "Failed !! " }
        end
      end
    rescue => e
      render :json => { :status => "error", :message => e.message }
    end
  end

  def new
  end

  def destroy
  end

  def home

  end
  
  def update
    begin
      Expense.transaction do
        
        # code to update expense -------------------------
        # find existing expense instance
        expense = Expense.find(params[:id])
        
        # allow only user's expenses to be updated
        if expense.user_id == session[:user_id]
          # storing old_amount
          old_amount = expense.amount
          
          # storing old_payment_type
          old_payment_type = expense.payment_type
          
          # updating user_id in params
          params["expense"]["user_id"] = session[:user_id]
          
          # saving the expense and storing the response
          expense_saved = expense.save_it(params["expense"])
          
          # udpate budget only if expense is extra  
          if !expense.is_extra
            #code to update budget -------------------------
            #budget = Budget.current_month_budget
            
            # updating budget instace based on changes made to the expense instance
            #budget_saved = budget.update_budget_on_update_expense(expense, old_amount, old_payment_type) if expense_saved
            budget_saved = Budget.find(expense.budget.id).update_budget_on_update_expense(expense, old_amount, old_payment_type) if expense_saved  
          end
          
          if expense_saved #&& (expense.is_extra || budget_saved)
           render :json => { :status => "success", :message => "Updated Successfully ! Kick to fade me out !" }
          else
           render :json => { :status => "error", :message => "Failed !! " }
          end
        else
          render :json => { :status => "error", :message => "Fuck yourself buddy ! Don't try to do something which you're not allowed to !!" }    
        end
        # params["expense"]["user_id"] = session[:user_id]
  #       
        # if expense.save_it(params)
          # render :json => { :status => "success", :message => "Updated Successfully ! Kick to fade me out !" }
        # else
          # render :json => { :status => "error", :nessage => "Failed !! " }
        # end  
      end
    rescue => e
      render :json => { :status => "error", :message => e.message }
    end
    
  end
  
  def get_current_month_budget
      budget = Budget.current_month_budget
      
      # Get extra expenses for the current month
      extra_expenses = Expense.current_month_extra_expenses(budget)
      
      render :json => { :id => budget.id, :budget_cash => budget.budget_cash, :budget_sodexo => budget.budget_sodexo, \
      :remaining_cash => budget.remaining_cash, :remaining_sodexo => budget.remaining_sodexo, :extra_expenses => extra_expenses }
  end
  
  # HANDOVER: A process which will be called at the end of every month
  # doing settlements as:
  # all extra expenses of the previous month will be added as an expense for the current month
  # paid_by the current month owner and description as: paid_to_<user>_for_extra_expense, paid_date: first day of month
  def handover
=begin    
    begin
      Expense.transaction do
        
        # get the current month budget
        budget = Budget.current_month_budget
        
        params["next_month_owner_id"] = User.find_by_username(params["next_month_owner"]).id
        
        # get the extra_expense for current month
        extra_expenses = Expense.current_month_extra_expenses(budget)
        
        # create next month budget
        next_month_budget = Budget.create_next_month_budget(budget, params)
        
        p "###"
        p next_month_budget
        
        unless next_month_budget.blank?
          # a hash to store the expese data
          expense_data = Hash.new
          
          extra_expenses.each do | expense |
            unless expense["username"] == "Total"
              expense_data.clear
              expense_data["user_id"] = params["next_month_owner_id"]
          
              expense_data["expense_type"] = "Extra Expense"
              expense_data["paid_date"] = Date.today.at_beginning_of_month.next_month
              
              if expense["cash"] > 0
                new_exp = next_month_budget.expenses.new
                expense_data["description"] = "paid to " + User.find(expense["id"]).username
                expense_data["amount"] = expense["cash"]
                expense_data["payment_type"] = "Cash"
                
                new_exp.save_it(expense_data)           
                
                # update budget
                next_month_budget.update_budget_on_new_expense(new_exp) 
              end
              
              if expense["sodexo"] > 0
                new_exp = next_month_budget.expenses.new
                expense_data["description"] = "paid to " + User.find(expense["id"]).username
                expense_data["amount"] = expense["sodexo"]
                expense_data["payment_type"] = "Sodexo"
                
                new_exp.save_it(expense_data)
                
                # update budget
                next_month_budget.update_budget_on_new_expense(new_exp)
              end
            end    
          end unless extra_expenses.blank?
        end
      end
      render :json => { :status => "success", :message => "seems it workd !!" }
    rescue => e
      render :json => { :status => "error", :message => e.message }
    end
=end
  end
end