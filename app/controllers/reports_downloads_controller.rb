class ReportsDownloadsController < ApplicationController
  def create
    if reports_exists?
      File.delete("public/report.xlsx")
    end
    ReportDownloaderJob.perform_later(Attempt.load_report)
    sleep 10
    render status: :ok, json: { notice: "Your file is now ready to download." }
  end

  def show
    if reports_exists?
      send_file "public/report.xlsx", type: "application/xlsx", disposition: "attachment"
    else
      render status: :unprocessable_entity, json: { error: "Report not found" }
    end
  end

  private

    def reports_exists?
      File.exist?("public/report.xlsx")
    end
end
