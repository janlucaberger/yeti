class Api::PriorityTypesController < ApplicationController

  def index
    @priority_types = PriorityType.all
  end

end
