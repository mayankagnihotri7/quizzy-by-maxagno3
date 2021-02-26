import React from "react";
import { saveAs } from "file-saver";
import Button from "components/Button";

const DownloadReport = props => {
  const handleDownload = () => {
    const data = URL.createObjectURL(new Blob([props.location.send.data]));
    saveAs(data, "report.xlsx");
  };

  return (
    <div className="flex justify-center items-center fixed top- 0 h-full w-full">
      <h2>
        Report is now ready for download
        <br />
        <Button buttonText="Download report" onClick={handleDownload} />
      </h2>
    </div>
  );
};

export default DownloadReport;
