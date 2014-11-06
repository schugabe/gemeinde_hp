class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  before_filter :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_or_null_user
  add_breadcrumb "Home", :root_path
    
  def current_or_null_user
    if current_user == nil
      User.new
    else
      current_user
    end
  end
  
  def authority_forbidden(error)
    Authority.logger.warn(error.message)
    redirect_to request.referrer.presence || root_path, :alert => t('actions.not_authorized')
  end
  
protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
    devise_parameter_sanitizer.for(:account_update) << :name    
  end

  def default_url_options()
    if Rails.env.production?
      {host: "evang-thening.at", port: 80}
    else
      {}
    end
  end
end
