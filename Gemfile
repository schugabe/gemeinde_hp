source 'https://rubygems.org'

gem 'dotenv-rails', :groups => [:production, :development, :test]

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.6'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0'
gem 'bootstrap-sass', '~> 3.0'
gem 'bootstrap_form', '~> 2.1'
gem "autoprefixer-rails"
gem 'font-awesome-sass'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'jquery-turbolinks'
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

gem 'devise', '>= 3.1'
gem 'authority', '>= 2.9.0'
gem 'rolify', github: 'EppO/rolify'
gem 'bootstrap-wysihtml5-rails'
gem 'sanitize-rails', :require => 'sanitize/rails'
gem "paperclip", "~> 4.1"
gem "paperclip-ffmpeg"
gem 'ranked-model'
gem 'breadcrumbs_on_rails'
gem 'jplayer-rails'

group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'sqlite3'
end

gem 'unicorn'

#group :production do
#  gem 'pg'
#end

group :test do
  gem 'capybara'
  gem 'cucumber-rails', :require=>false
  gem 'database_cleaner', '>= 1.0.1'
  gem 'email_spec'
  gem 'launchy'
end

group :development do
  gem 'capistrano-rails', '~> 1.1.0'
  gem 'capistrano-chruby', '~> 0.1.1'
  gem 'capistrano3-unicorn'
  gem 'quiet_assets'
end

# Use debugger
# gem 'debugger', group: [:development, :test]
