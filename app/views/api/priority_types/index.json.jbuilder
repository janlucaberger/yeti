@priority_types.each do |type|
  json.set! type.id do
    json.extract!(type, :id, :priority_type)
    json.icon_url type.icon.url
  end
end
