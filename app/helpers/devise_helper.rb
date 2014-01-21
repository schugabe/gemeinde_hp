module DeviseHelper
  def devise_tab(link,active)
    result = ""
    if controller_name==active
      result << '<li class="active">'
    else
      result << '<li>'
    end
    result << link
    result << '</li>'
    return result.html_safe
  end
  
  def devise_error_messages!
    return "" if resource.errors.empty?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t("errors.messages.not_saved", :count => resource.errors.count, :resource => resource.class.model_name.human.downcase)

    html = <<-HTML
    <div id="error_explanation" class="alert alert-danger">
      <strong>#{sentence}</strong>:
      <ul>#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end
end