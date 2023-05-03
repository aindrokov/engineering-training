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

const iterateJiraLinks = jiraLinks.forEach((link) => {
  console.log(link);
});

var listElement = document.getElementsByClassName("grid-container");

let dataLoaded = false;

class JiraHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jirasObject = [];
    this.createJiraObject();
  }
    createJiraObject() {
      for (let i = 0; i < this.titles.length; i++) {
        this.jirasObject.push({
          link: this.links[i],
          title: this.titles[i],
        });
      }
    }
}

const jiraHandler = new JiraHandler(jiraLinks, jiraTitles);

const utils = {
  renderData: function () {
    return new Promise((resolve) => {
      let response = "";
      jirasObject.forEach((object) => {
        const { link, title } = object;
        response += `<li>
            <i class="bi bi-check-circle-fill"></i>
            <a href="${link}">${title}</a>
          </li>`;
      });
      resolve(response);
    });
  },
  loadData: function () {
    setTimeout(function () {
      utils.renderData().then((response) => {
        dataLoaded = true;
        listElement[0].innerHTML = response;
        modalContainer.classList.toggle("hidden");
        console.log("data loaded");
        return response;
      });
    }, 1000);
  }
}

modalButton.addEventListener("click", function () {
  if (dataLoaded === true) {
    return;
  }
  console.log("Clicked Button!");
  modalContainer.classList.toggle("hidden");
  utils.loadData();
});

closeModalButton[0].addEventListener("click", function () {
  console.log("Clicked Close Modal Button!");
  modalContainer.classList.toggle("hidden");
});

const jirasObject = [];
for (let i = 0; i < jiraHandler.titles.length; i++) {
  jirasObject.push({
    link: jiraHandler.links[i],
    title: jiraHandler.titles[i],  
  });
}
