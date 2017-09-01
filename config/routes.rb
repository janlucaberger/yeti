Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    # USERS
    resources :users, except: [:edit, :new] do
      collection do
        get :issues
        get :comments
        get :assigned_isses
      end
    end

    #SESSIONS
    resource :sessions, only: [:create, :destroy]

    #TEAMS
    resources :teams, only: [:create, :index, :show, :update] do
      collection do
        get :activity, to: "analytics#team_activity"
        get :users
        get :archive
      end
    end

    #PROJECTS
    resources :projects, except: [:new, :edit] do
      member do
        get :issues
        get :sprint, to: "sprints#show"
        post :sprint, to: "sprints#create"
        post :complete_sprint, to: "sprints#complete"
      end
      collection do
        get :list
      end
    end

    #ISSUES
    resources :issues, except: [:new, :edit] do
      member do
        get :attachments
        post :attachments, to: "issues#add_attachment"
        delete :attachments, to: "issues#delete_attachment"

        get :comments
        post :comments, to: "issues#add_comment"
        delete :comments, to: "issues#delete_comment"

        post :votes, to: "issues#add_vote"
        delete :votes

        post :watchers, to: "issues#add_watcher"
        delete :watchers, to: "issues#delete_watcher"

        get :history
      end
      collection do
        get :archive, to: "teams#archive"
      end
    end

    #Analytics
    get '/analytics/assigned_issues', to: "analytics#assigned_issues"
    get '/analytics/data', to: "analytics#data"


    #MISC UI

    get '/issue_types', to: "issue_types#index"
    get '/status_types', to: "status_types#index"
    get '/priority_types', to: "priority_types#index"
    get '/resources', to: "sessions#resources"
  end

end
