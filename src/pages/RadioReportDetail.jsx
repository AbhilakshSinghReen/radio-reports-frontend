import { useState, useEffect } from "react";

import ReportMeshesRenderer from "../components/ReportMeshesRenderer";
import ReportTextDisplayer from "../components/ReportTextDisplayer";
import apiClient from "../api/apiServices";

export default function RadioReportDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const getReportDetailFromApiAndSetState = async (reportId) => {
    setIsLoading(true);

    const responseData = await apiClient.reports.getDetail(reportId);
    if (!responseData.success) {
      console.log(responseData);
      setIsLoading(false);
      return;
    }

    setReportData(responseData.result.report);
    setIsLoading(false);
  };

  useEffect(() => {
    getReportDetailFromApiAndSetState(2); // TODO: get reportId from query params
  }, []);

  // TODO: display loading screen

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "white",
        margin: 0,
      }}
    >
      <ReportMeshesRenderer reportData={reportData} />
      <ReportTextDisplayer reportData={reportData} />
    </div>
  );
}
