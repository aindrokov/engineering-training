const listElement = document.getElementsByClassName("grid-container");

const utils = {
  loadData: async function (callback) {
    const response = await fetch("/dataHandler");
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
      this.renderData(data).then((response) => {
        listElement[0].innerHTML = response;
        modalContainer.classList.toggle("hidden");
        console.log("data loaded");
        return response;
      });
    }, 1000);
    callback();
  },
  renderData: function (data) {
    return new Promise((resolve) => {
      let response = "";
      data.jirasObject.forEach((object) => {
        let { link, title, icon } = object;
        response += `<li class="item"><a href= ${link}> 
        <i class="${icon}">
        </i> ${title} 
        </a></li>`;
      });
      resolve(response);
    });
  },
};

export default utils;
