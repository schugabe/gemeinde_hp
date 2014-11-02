module ApplicationHelper
  
  def event_duration(event)
    duration = l(event.starts_at, :format => :long)
    duration << " - "
    
    if event.starts_at.to_date === event.ends_at.to_date
      duration << l(event.ends_at, :format => :time)
    else 
      duration << l(event.ends_at, :format => :short)
    end
  end
  
  def state_label(event)
    now = DateTime.now
    
    text = ""
    type = ""
    if now < event.ends_at
      if now+1.hour > event.starts_at
        text = "bald"
        type = "warning"
      end
      if now > event.starts_at
        text = "jetzt"
        type = "success"
      end
      "<span class=\"label label-#{type}\">#{text}</span>".html_safe unless text.blank?
    end
  end
  
  def format_datetime(date)
    date.nil? ? "Nie" : l(date, format: :long)
  end
  
  def link_btn(body, url, style="btn-default" )
    link_to body, url, class:"btn #{style}"
  end
  
  def new_btn(label, url, append_br=true)
    br = ""
    br = "<br><br>" if append_br
    link_btn(t(label), url, "btn-primary")+"#{br}".html_safe
  end
  
  def edit_btn(url)
    link_btn t('actions.edit'), url, "btn-default btn-sm"
  end
  
  def destroy_btn(url)
    link_to t('actions.destroy'), url, method: :delete, data: { confirm: t('actions.confirm') },class: "btn btn-danger btn-sm"
  end
  
  def print_errors(resource)
    if resource.errors.any?
      result = '<div class="alert alert-warning"><ul>'
      resource.errors.full_messages.each do |msg|
        result << "<li>#{h(msg)}</li>"
      end
      result << '</ul></div>'
      result.html_safe
    end
  end
end
