json.issues do
  json.array! @issues.pluck(:id)
end

json.sprint do
  json.extract!(@sprint, :id)
end
