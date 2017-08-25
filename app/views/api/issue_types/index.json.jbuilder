@issue_types.each do |type|
  json.set! type.id do
    json.extract!(type, :id, :issue_type)
    json.icon_url type.icon.url
  end
end
