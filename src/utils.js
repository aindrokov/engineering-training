import store from "./store.js";

const utils = {
  renderData: async function () {
    return new Promise(async (resolve) => {
      const apiResponse = await fetch("/dataHandler").catch((err) => {
        store.dispatch({ type: "DATA_FAILURE", error: err.message  });
      });
      if (!apiResponse || !apiResponse.json) {
        return;
      }
      apiResponse.json().then((data) => {
        store.dispatch({ type: "DATA_SUCCESS", data });
        resolve(data);
      });
    });
  },
  loadData: function (callback) {
    this.renderData().then((response) => {
      callback(response);
    });
  },
};

export default utils;