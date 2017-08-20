Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'staticpages#root'

  namespace :api, defaults: { format: :json } do
    # USERS
    resources :users, only: [:create, :show, :update, :destroy] do
      collection do
        get :issues
        get :comments
      end
    end

    #SESSIONS
    resource :sessions, only: [:create, :destroy]

    #TEAMS
    resources :teams, only: [:create, :show, :update] do
      collection do
        get :activity
        get :users
      end
    end

    #PROJECTS
    resources :projects, except: [:new, :edit] do
      member do
        get :issues
        get :sprint
        post :sprint
      end
      collection do
        get :list
      end
    end

    #ISSUES
    resources :issues, except: [:new, :edit] do
      member do
        get :attachments
        post :attachments
        delete :attachments

        get :comments
        post :comments
        delete :comments

        post :votes
        delete :votes

        post :watchers
        delete :watchers

        get :history
      end
    end

    #MISC UI

    get '/issue_types', to: "issue_types#index"
    get '/status_types', to: "status_types#index"

  end

end
