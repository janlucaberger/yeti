class Api::IssueTypesController < ApplicationController

  def index
    @issue_types = IssueType.all
  end

end
