json.array!(@attachments) do |attachment|
  json.extract! attachment, :id, :title, :description, :starts_at, :ends_at
  json.url attachment_url(attachment, format: :json)
end
