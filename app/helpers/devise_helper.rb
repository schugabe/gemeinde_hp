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
end