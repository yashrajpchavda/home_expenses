HomeExpenses::Application.routes.draw do

  get "log_in" => "sessions#new", :as => "log_in"
  get "log_out" => "sessions#destroy", :as => "log_out"
  get "get_current_user" => "users#get_current_user", :as => "get_current_user"
  get "current_month_budget" => "expenses#get_current_month_budget", :as => "current_month_budget"
  post "handover" => "expenses#handover", :as => "handover"
  
  resources :users
  resources :sessions
  resources :expenses

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'expenses#home'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
#== Route Map
# Generated on 09 Feb 2013 15:43
#
#              log_out GET    /log_out(.:format)              sessions#destroy
#     get_current_user GET    /get_current_user(.:format)     users#get_current_user
# current_month_budget GET    /current_month_budget(.:format) expenses#get_current_month_budget
#             handover POST   /handover(.:format)             expenses#handover
#                users GET    /users(.:format)                users#index
#                      POST   /users(.:format)                users#create
#             new_user GET    /users/new(.:format)            users#new
#            edit_user GET    /users/:id/edit(.:format)       users#edit
#                 user GET    /users/:id(.:format)            users#show
#                      PUT    /users/:id(.:format)            users#update
#                      DELETE /users/:id(.:format)            users#destroy
#             sessions GET    /sessions(.:format)             sessions#index
#                      POST   /sessions(.:format)             sessions#create
#          new_session GET    /sessions/new(.:format)         sessions#new
#         edit_session GET    /sessions/:id/edit(.:format)    sessions#edit
#              session GET    /sessions/:id(.:format)         sessions#show
#                      PUT    /sessions/:id(.:format)         sessions#update
#                      DELETE /sessions/:id(.:format)         sessions#destroy
#             expenses GET    /expenses(.:format)             expenses#index
#                      POST   /expenses(.:format)             expenses#create
#          new_expense GET    /expenses/new(.:format)         expenses#new
#         edit_expense GET    /expenses/:id/edit(.:format)    expenses#edit
#              expense GET    /expenses/:id(.:format)         expenses#show
#                      PUT    /expenses/:id(.:format)         expenses#update
#                      DELETE /expenses/:id(.:format)         expenses#destroy
#                 root        /                               expenses#home
