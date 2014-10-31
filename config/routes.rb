GemeindeHp::Application.routes.draw do
  resources :rooms

  root :to => "home#index"
  get "page/:permalink", :to => "pages#show", :as => :page_permalink
  get 'calendar/index'
  get 'calendar/upcoming'
  get 'calendar/upcoming_month'
  get 'podcast/index'
  
  devise_for :users, :controllers => { :registrations => :registrations }, :path_prefix => 'my'
  resources :users do
    member do
      put :activate
      put :disable
    end
  end
  resources :pages
  resources :roles
  
  resources :magazines do
    member do
      get 'readpdf'
    end
  end
  
  resources :teams do
    resources :people do
       post :sort, on: :collection
     end
  end

  resources :events do
    resources :attachments
  end
  
  resource :eventbatch
end
