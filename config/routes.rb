GemeindeHp::Application.routes.draw do
  resources :events do
    resources :attachments
  end
  resources :pages

  get "home/index"
  get "page/:permalink", :to => "pages#show", :as => :page_permalink
  get "calendar/index"
  root :to => "home#index"
  
  devise_for :users, :controllers => { :registrations => :registrations }
  resources :users, only: [:index, :show]
end
