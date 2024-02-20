// DataService.js
import ApiServices from "./apiService";
import MockService from "./mockService";

class DataService {
  source = "api";

  init(source) {
    console.log("Initializing with source:", source);
    this.source = source;
  }

  async getUserData(userId) {
    console.log("Selected Source:", this.source);

    let data;

    if (this.source === "api") {
      const apiData = await ApiServices.getUserData(userId);
      console.log("API Data:", apiData);
      data = {
        userInfos: apiData?.data?.userInfos || {},
      };
    } else {
      const mockData = await MockService.getUserData(userId);
      console.log("Mock Data:", mockData);
      data = {
        userInfos: mockData?.userInfos || {},
      };
    }

    console.log("Final Data:", data);
    return data;
  }
}

export default new DataService();
