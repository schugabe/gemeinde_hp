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
  
  def link_btn(body, url, style="btn-default" )
    link_to body, url, class:"btn #{style}"
  end
  
  def link_btn_destroy(body, url)
    link_to body, url, method: :delete, data: { confirm: 'Wirklich löschen?' }, class:"btn btn-danger"
  end
  
end
