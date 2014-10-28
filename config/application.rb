require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module GemeindeHp
  class Application < Rails::Application
    
    config.generators do |g|
      g.test_framework :rspec, fixture: true
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
      g.view_specs false
      g.helper_specs false
      g.stylesheets = false
      g.javascripts = false
      g.helper = false
    end
    
    config.filter_parameters += [:password, :password_confirmation]
    
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Vienna'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :de
    
    config.autoload_paths += %W(#{config.root}/lib)
    
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.assets.precompile += %w( pdfreader.js pdf.css )
    config.action_view.sanitized_allowed_tags = 'br', 'b', 'i', 'u', 'blockqoute', 'a', 'ul', 'li', 'ol'
  end
end
