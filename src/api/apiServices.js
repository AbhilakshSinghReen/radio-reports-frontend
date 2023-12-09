import apiEndpoints from "./apiEndpoints";

class ApiClient {
  constructor() {
    this.reports = {
      getDetail: async (id) => {
        const endpoint = apiEndpoints.reports.getDetail();
        const requestBody = {
          reportId: id,
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        return responseData;
      },
    };
  }
}

const apiClient = new ApiClient();

export default apiClient;
