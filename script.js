console.log("script.js loaded");

const jirasObject = [
    {
        link: "https://totalwine.atlassian.net/browse/TT-2",
    title: "Create a public repository under your GitHub account",
  },

  {
      link: "https://totalwine.atlassian.net/browse/TT-16",
    title:
      "Create a new script file, and import it into index.html and add a console log",
  },

  {
      link: "https://totalwine.atlassian.net/browse/TT-17",
    title: "JavaScript: Variables",
  },

  {
      link: "https://totalwine.atlassian.net/browse/TT-18",
    title: "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  },

  {
      link: "https://totalwine.atlassian.net/browse/TT-19",
    title:
      "JavaScript: Functions - Write a function to toggle hidden class on modal",
  }
];

const openModalButton = document.querySelector("#modalButton");

const closeModalButton = document.querySelector("#closeModalButton");

const modalContainer = document.querySelector("#modalContainer");

const jiraList = document.querySelector("#jiraList");

openModalButton.addEventListener("click", () => {
    modalContainer.classList.remove("hidden");
    setTimeout(() => {
      utils.renderData().then((response) => {
        jiraList.innerHTML = response;
    });
      modalContainer.classList.add("hidden");
    }, 1000);
});

const utils = {
    renderData: function () {
        return new Promise((resolve) => {
            let response = "";
            jirasObject.forEach((object) => {
                const { link, title } = object;
                response += `<li>
                <a href="${link}">${title}</a>
                </li>`;
            });
            resolve(response);
            console.log(response);
        });
    }
}
