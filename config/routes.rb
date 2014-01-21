GemeindeHp::Application.routes.draw do
  
  resources :pages

  get "home/index"
  root :to => "home#index"
  
  devise_for :users, :controllers => { :registrations => :registrations }
  resources :users, only: [:index, :show]
end
