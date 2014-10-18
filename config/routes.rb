GemeindeHp::Application.routes.draw do
  root :to => "home#index"
  get "home/index"
  get "page/:permalink", :to => "pages#show", :as => :page_permalink
  get "calendar/index"
  get 'podcast/index'

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
  
  resources :pages

  devise_for :users, :controllers => { :registrations => :registrations }
  resources :users, only: [:index, :show]
end
