require("dotenv").config();

const { Octokit } = require("@octokit/rest");
const { application } = require("express");
const JiraApi = require('jira-client');

const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
  baseUrl: 'https://api.github.com',
  log: {
      debug: () => {},
      info: () => {},
      warn: console.warn,
      error: console.error
  },
  request: {
      agent: undefined,
      fetch: undefined,
      timeout: 0
  }
});

var jira = new JiraApi({
  protocol: "https",
  host: "totalwine.atlassian.net",
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_TOKEN,
  apiVersion: "2",
  strictSSL: true,
});

async function getJiraSummaryInfo(issueNumber) {
  return new Promise(async (resolve) => {
    const issue = await jira.findIssue(issueNumber);
    const jiraIssue = { title: issue.fields.summary, link: `https://totalwine.atlassian.net/browse/${issueNumber}` };
    resolve(jiraIssue);
  })
}

const jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];

const jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];

const jiraTemplate = { icon: "bi bi-check-circle-fill" };

const errorJiraTemplate = { icon: "bi bi-x-circle" };

const promises = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getIcon() {
  let rNum = getRandomInt(3);
  return rNum >= 1 ? jiraTemplate : errorJiraTemplate;
}

class DataHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jirasObject = [];
    this.createJiraObject();
    this.fetchGitHubData();
    this.getJiraInfo();
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

  async fetchGitHubData() {
    return new Promise(async (resolve) => {
      const commits = await octokit.rest.repos.listCommits({
        owner: "aindrokov",
        repo: "Engineering-Training",
      });
      resolve(commits);
    });
  }
  getJiraInfo() {
    this.fetchGitHubData().then((listMyCommits) => {
      let jiraTicketNumber = [];
      const regex = /([A-Z][A-Z0-9]+-[0-9]+)/g;
      for (let index = 0; index < listMyCommits.data.length; index++) {
        let ticketNumber =
          listMyCommits.data[index].commit.message.match(regex);
        let indx = jiraTicketNumber.indexOf(ticketNumber);

        if (ticketNumber !== null && indx === -1) {
          jiraTicketNumber.push(ticketNumber);
        } else {
          console.log(jiraTicketNumber + " Jira ticket duplicates");
        }
      }
      console.log(jiraTicketNumber);

      for (let i = 0; i < jiraTicketNumber.length; i++) {
        promises.push(getJiraSummaryInfo(jiraTicketNumber[i]));
      }
      Promise.all(promises).then((values) => {
        console.log(values); 
      });
    });
  }
}

const dataHandler = new DataHandler(jiraLinks, jiraTitles);

module.exports = dataHandler;
