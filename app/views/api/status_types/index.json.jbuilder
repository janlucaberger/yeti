@status_types.each do |type|
  json.set! type.id do
    json.extract!(type, :id, :status_type)
  end
end
