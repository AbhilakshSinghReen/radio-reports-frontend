const urlParser = new URL(window.location.href);
const urlOrigin = urlParser.origin;

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
let mediaBaseUrl = process.env.REACT_APP_MEDIA_BASE_URL;

if (!process.env.REACT_APP_API_BASE_URL) {
  apiBaseUrl = urlOrigin + "/api/ocr";
  console.warn(`Environment variable REACT_APP_API_BASE_URL not defined, will default to ${apiBaseUrl}`);
}

if (!process.env.REACT_APP_MEDIA_BASE_URL) {
  mediaBaseUrl = urlOrigin + "/media";
  console.warn(`Environment variable REACT_APP_MEDIA_BASE_URL not defined, will default to ${mediaBaseUrl}`);
}

const detectionImageUrlPrefix = mediaBaseUrl + "/segment-meshes/";
