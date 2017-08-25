class Api::StatusTypesController < ApplicationController

  def index
    @status_types = StatusType.all
  end

end
