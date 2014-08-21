json.array!(@magazines) do |magazine|
  json.extract! magazine, :id, :issue, :year, :title
  json.url magazine_url(magazine, format: :json)
end
