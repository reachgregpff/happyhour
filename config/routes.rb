Rails.application.routes.draw do

  #get request to '/' code is in pags controller home method / action
  get '/' => 'pages#home'
  get '/contact' => 'pages#contact',  as: :contact    #if client person wants info instead of about in the url
  
  #showing the logging form
  get '/login' => 'session#new'

  #login
  post '/login' => 'session#create'

  #logout
  delete '/logout' => 'session#destroy'


  #display cocktails
  get '/cocktails/:page'  =>  'cocktails#list'


  #clicking on a star on a cocktail image
  get '/like_cocktail'  => 'pages#like_cocktail'

  #clicking on a coktail in a cocktail list
  get '/cocktails/show/:cocktail_id'    =>   'cocktails#show'

  #display bars
  resources :bars


  #API HERE 
  namespace :api do
    resources :bars, only: [:index, :create, :destroy]
    resources :barfaves, only: [:create, :destroy]
  end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
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

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
