json.array!(@events) do |event|
  json.set! :id, event.id
  json.set! :title, event.title
  json.set! :description, event.description
  json.set! :start, event.starts_at.rfc822
  json.set! :end, event.ends_at.rfc822
  json.set! :allDay, event.all_day
  json.set! :recurring, 'false'
  json.url event_url(event, format: :json)
end
