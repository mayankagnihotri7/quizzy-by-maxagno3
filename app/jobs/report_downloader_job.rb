require "axlsx"

class ReportDownloaderJob < ApplicationJob
  queue_as :default

  def perform(reports)
    generate_excel_file(reports)
  end

  private

    def generate_excel_file(reports)
      Axlsx::Package.new do |p|
        p.workbook.add_worksheet(name: "Reports") do |sheet|
          sheet.add_row ["Quiz name", "User name", "email", "Correct Answers", "Incorrect Answers"]
          reports.map do |report|
            report[:user_name] = report[:first_name] + " " + report[:last_name]
            sheet.add_row [report[:quiz_name], report[:user_name], report[:email], report[:correct_answers], report[:incorrect_answers]]
          end
        end
        p.use_shared_strings = true
        p.serialize("public/report.xlsx")
      end
    end
end
