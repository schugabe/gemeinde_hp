source 'https://rubygems.org'

gem 'dotenv-rails', :groups => [:production, :development, :test]
gem 'rails', '4.1.6'

gem 'sass-rails', '~> 4.0'
gem 'bootstrap-sass', '~> 3.0'
gem 'bootstrap_form', '~> 2.1'
gem "autoprefixer-rails"

gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0'
gem 'therubyracer', platforms: :ruby

gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jquery-turbolinks'
gem 'turbolinks'

gem 'jbuilder', '~> 1.2'
gem 'devise', '>= 3.1'
gem 'authority', '>= 2.9.0'
gem 'rolify', github: 'EppO/rolify'
gem 'bootstrap-wysihtml5-rails'
gem 'sanitize-rails', :require => 'sanitize/rails'
gem "paperclip", "~> 4.1"
gem 'ranked-model'
gem 'breadcrumbs_on_rails'
gem 'font-awesome-sass'
gem 'will_paginate-bootstrap'
gem 'audiojs'
gem 'tzinfo-data', platforms: [:mingw, :mswin]
gem 'recurrence'

group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'sqlite3'
end

group :production do
# gem 'mysql2'
  gem 'thin'
end

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
  #gem 'capistrano3-unicorn'
  gem 'quiet_assets'
end

group :doc do
  gem 'sdoc', require: false
end

# Use debugger
# gem 'debugger', group: [:development, :test]
#gem 'unicorn'