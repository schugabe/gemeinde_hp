module ApplicationHelper
  def render_breadcrumbs(divider = '/', &block)
    content = render :partial => 'layouts/breadcrumbs', :layout => false, :locals => { :divider => divider }
    if block_given?
      capture(content, &block)
    else
      content
    end
  end
end
