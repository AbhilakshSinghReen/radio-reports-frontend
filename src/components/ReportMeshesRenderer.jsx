import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import IconButton from "@mui/material/IconButton";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  RestartAlt as RestartAltIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";

import ReportMeshesScene from "./ReportMeshesScene";
import { segmentMeshesUrlPrefix } from "../api/apiEndpoints";

export default function ReportMeshesRenderer({ reportData }) {
  const [playbackState, setPlaybackState] = useState("playing");
  const [visibilityMode, setVisibilityMode] = useState("all_visible");

  const [sceneData, setSceneData] = useState(emptySceneData);

  const constructSceneDataFromReportData = (reportData) => {
    const reportMediaId = reportData?.report_media_id ?? null;
    const meshesMetadata = reportData?.meshes_metadata ?? null;

    if (!reportMediaId || !meshesMetadata) {
      return;
    }

    const sceneMeshes = [];
    for (const mesh of meshesMetadata.meshes) {
      sceneMeshes.push({
        name: mesh.name,
        url: `${segmentMeshesUrlPrefix}/${reportMediaId}/${mesh.name}`,
        isROI: mesh.isROI,
        color: "#", // TODO (Dr. Amit + Abhilaksh): get good colors
      });
    }

    // sceneMeshes.forEach((mesh) => {
    //   console.log(mesh);
    // });

    setSceneData({
      meshes: sceneMeshes,
    });

    // console.log(reportMediaId);
    // console.log(reportMediaId)
  };

  const handleChangePlaybackStateButtonClick = (e) => {
    setPlaybackState(nextPlaybackState[playbackState]);
  };

  const handleResetCameraButtonClick = () => {
    //reset thing
  };

  const handleVisibilityModeButtonClick = () => {
    setVisibilityMode(nextVisibilityMode[visibilityMode]);
  };

  useEffect(() => {
    constructSceneDataFromReportData(reportData);
  }, [reportData]);

  return (
    <div
      style={{
        width: "100%",
        height: "60%",
        backgroundColor: "black",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={handleChangePlaybackStateButtonClick}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#111111",
          zIndex: 5,
        }}
      >
        {changePlaybackStateButtonUi[playbackState].icon}
      </IconButton>

      <IconButton
        onClick={handleResetCameraButtonClick}
        style={{
          position: "absolute",
          top: 60,
          right: 10,
          backgroundColor: "#111111",
          zIndex: 5,
        }}
      >
        <RestartAltIcon color="warning" />
      </IconButton>

      <IconButton
        onClick={handleVisibilityModeButtonClick}
        style={{
          position: "absolute",
          top: 110,
          right: 10,
          backgroundColor: "#111111",
          zIndex: 5,
        }}
      >
        {visibilityModeButtonUi[visibilityMode].icon}
      </IconButton>

      <Canvas linear flat>
        <ReportMeshesScene sceneData={sceneData} />
      </Canvas>

      <h1>ReportMeshesRenderer</h1>
    </div>
  );
}

const emptySceneData = {
  meshes: [],
};

const changePlaybackStateButtonUi = {
  playing: {
    label: "",
    color: "primary",
    icon: <PlayArrowIcon color="primary" />,
  },
  paused: {
    label: "",
    color: "primary",
    icon: <PauseIcon color="primary" />,
  },
};
const nextPlaybackState = {
  playing: "paused",
  paused: "playing",
};

const visibilityModeButtonUi = {
  all_visible: {
    label: "",
    color: "primary",
    icon: <VisibilityIcon color="secondary" />,
  },
  non_roi_translucent: {
    label: "",
    color: "primary",
    icon: <PreviewIcon color="secondary" />,
  },
  non_roi_hidden: {
    label: "",
    color: "primary",
    icon: <VisibilityOffIcon color="secondary" />,
  },
};
const nextVisibilityMode = {
  all_visible: "non_roi_translucent",
  non_roi_translucent: "non_roi_hidden",
  non_roi_hidden: "all_visible",
};
