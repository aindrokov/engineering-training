(async function() {

console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");

var listElement = document.getElementsByClassName("grid-container");

function initModalButton() {
  return new Promise((resolve) => {
    var dataLoaded = false;
    modalButton.addEventListener("click", function () {
      modalContainer.classList.toggle("hidden");
      console.log("Clicked Button!");
      if (dataLoaded === false) {
        utils.loadData(() => {
          resolve();
          dataLoaded = true;
        });
      }
    });
  });
}

const utils = {
  loadData: async function (callback) {
    const response = await fetch("/dataHandler");
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
    this.renderData(data).then((response) => {
      dataLoaded = true;
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

closeModalButton[0].addEventListener("click", function () {
  console.log("Clicked Close Modal Button!");
  modalContainer.classList.toggle("hidden");
});

console.log("BEFORE initModalButton is called");
await initModalButton();
console.log("AFTER initModalButton is called");

})();
