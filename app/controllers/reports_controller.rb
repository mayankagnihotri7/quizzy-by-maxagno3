class ReportsController < ApplicationController
  def index
    attempt = Attempt.load_report
    render status: :ok, json: { attempt: attempt }
  end
end
