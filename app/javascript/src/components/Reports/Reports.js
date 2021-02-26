import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import { CircleLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const history = useHistory();

  const fetchAttemptDetails = async () => {
    setLoading(true);
    const attemptDetail = await axios.get("/attempts");
    setLoading(false);
    setReport(attemptDetail.data?.attempt);
  };

  const createDownloadLink = async () => {
    try {
      setLoading(true);
      await axios.post("/reports_downloads");
      const downloadReport = await axios.get("/reports_downloads", {
        responseType: "blob",
      });
      history.push({
        pathname: "/reports/download",
        send: { data: downloadReport.data },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttemptDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed top- 0 h-full w-full">
        <CircleLoader loading={loading} size={50} />
        <h1 className="ml-3">Your report is being prepared for downloading</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mt-10 ">
        <button
          className="bg-grey-light hover:bg-grey text-grey-darkest font-bold px-4 rounded inline-flex justify-end"
          onClick={createDownloadLink}
        >
          <i className="ri-download-line"></i>
          <span>Download</span>
        </button>
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
              <ReportTable report={report} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
