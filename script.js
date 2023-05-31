(async function() {

console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");

const jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];

const iterateJiraTitles = jiraTitles.forEach((title) => {
  console.log(title);
});

const jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];

const jiraTemplate = { icon: "bi bi-check-circle-fill" };

const errorJiraTemplate = { icon: "bi bi-x-circle" };

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getIcon() {
  let rNum = getRandomInt(3);
  return rNum >= 1 ? jiraTemplate : errorJiraTemplate;
}

const iterateJiraLinks = jiraLinks.forEach((link) => {
  console.log(link);
});

var listElement = document.getElementsByClassName("grid-container");

class JiraHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jirasObject = [];
    this.createJiraObject();
  }
  createJiraObject() {
    for (let i = 0; i < this.titles.length; i++) {
      let icon = getIcon();
      this.jirasObject.push({
        link: this.links[i],
        title: this.titles[i],
        ...icon,
      });
    }
  }
}

const jiraHandler = new JiraHandler(jiraLinks, jiraTitles);

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
  renderData: function () {
    return new Promise((resolve) => {
      let response = "";
      jirasObject.forEach((object) => {
        const { link, title, icon } = object;
        response += `<li>
            <i class="${icon}"></i>
            <a href="${link}">${title}</a>
          </li>`;
      });
      resolve(response);
    });
  },
  loadData: function (callback) {
    setTimeout(function () {
      utils.renderData().then((response) => {
        dataLoaded = true;
        listElement[0].innerHTML = response;
        modalContainer.classList.toggle("hidden");
        console.log("data loaded");
        return response;
      });
    }, 1000);
    callback();
  },
};

closeModalButton[0].addEventListener("click", function () {
  console.log("Clicked Close Modal Button!");
  modalContainer.classList.toggle("hidden");
});

const jirasObject = [];
for (let i = 0; i < jiraHandler.titles.length; i++) {
  let icon = getIcon();
  jirasObject.push({
    link: jiraHandler.links[i],
    title: jiraHandler.titles[i],
    ...icon,
  });
}

console.log("BEFORE initModalButton is called");
await initModalButton();
console.log("AFTER initModalButton is called");

})();
