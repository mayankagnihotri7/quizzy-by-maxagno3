import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";

const Reports = () => {
  const [report, setReport] = useState([]);

  const fetchAttemptDetails = async () => {
    const attemptDetail = await axios.get("/attempts");
    setReport(attemptDetail.data?.attempt);
  };

  useEffect(() => {
    fetchAttemptDetails();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mt-10 ">
        <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold px-4 rounded inline-flex justify-end">
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
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
