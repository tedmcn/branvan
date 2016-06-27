json.array!(@locations) do |location|
  json.extract! location, :id, :xcoord, :ycoord, :name
  json.url location_url(location, format: :json)
end
