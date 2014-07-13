module ApplicationHelper
  def render_breadcrumbs(divider = '/', &block)
    content = render :partial => 'layouts/breadcrumbs', :layout => false, :locals => { :divider => divider }
    if block_given?
      capture(content, &block)
    else
      content
    end
  end
  
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
end
