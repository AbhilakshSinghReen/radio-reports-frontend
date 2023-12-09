import ReportMeshesRenderer from "../components/ReportMeshesRenderer";
import ReportTextDisplayer from "../components/ReportTextDisplayer";

export default function RadioReportDetail() {
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
      <ReportMeshesRenderer />
      <ReportTextDisplayer />
    </div>
  );
}
