class HomeController < ApplicationController
  include ApplicationHelper
  def index
    #@get_all_transactions = get_all_transactions()
  end

  def create
      respond_to do |format|
    msg = { :status => "ok", :message => "Success!", :html => "<b>...</b>" }
    format.json  { render :json => msg } # don't do msg.to_json
      end
  end
end
