# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'evang-thening.at'
set :repo_url, 'https://github.com/schugabe/gemeinde_hp.git'

set :chruby_ruby, 'ruby-2.1'
set :linked_files, %w{config/database.yml .env config/unicorn.rb}
set :keep_releases, 5

set :unicorn_config_path, "#{current_path}/config/unicorn.rb"

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'unicorn:reload'
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
