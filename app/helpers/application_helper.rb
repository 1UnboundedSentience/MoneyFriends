module ApplicationHelper
  def get_all_transactions
    respond_to do |format|
      msg = {
      :status => "ok", :message => "Success!", :html => "<b>...</b>" }
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end
end

=begin
:args => {"uid": 1110881160,
                        "token": "4A7C75C97619AAE75614834BBDE2DE2F",
                        "api-token": "HackathonAPITokenDevweek4222"},

curl -H 'Accept: application/json' -H 'Content-Type: application/json' -X POST -d '{"args": {"uid": 1110881160, "token": "4A7C75C97619AAE75614834BBDE2DE2F", "api-token": "HackathonAPITokenDevweek4222"}}' https://prod-api.level-labs.com/api/v2/core/get-all-transactions
=end