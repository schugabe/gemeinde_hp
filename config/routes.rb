GemeindeHp::Application.routes.draw do
  
  get "home/index"
  root :to => "home#index"
  
  devise_for :users, :controllers => { :registrations => :registrations }
  resources :users, only: [:index, :show]
end
