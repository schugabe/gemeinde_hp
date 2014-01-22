GemeindeHp::Application.routes.draw do
  
  get "calendar/index"
  resources :events

  resources :pages

  get "home/index"
  get "page/:permalink", :to => "pages#show", :as => :page_permalink
  root :to => "home#index"
  
  devise_for :users, :controllers => { :registrations => :registrations }
  resources :users, only: [:index, :show]
end
