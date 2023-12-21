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
    const jiraIssue = {
      title: issue.fields.summary,
      link: `https://totalwine.atlassian.net/browse/${issueNumber}`,
      icon: "bi bi-check-circle-fill",
    };
    resolve(jiraIssue);
  });
}

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
  constructor() {
    this.jirasObject = [];
    this.jiraTicketNumber = [];
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
    return new Promise(async (resolve) => {
      this.fetchGitHubData().then((myCommitsList) => {
        let jiraTicketNumber = [];
        let promises = [];
        const regex = /([A-Z][A-Z0-9]+-[0-9]+)/g;
        for (let i = 0; i < myCommitsList.data.length; i++) {
          let ticketNumber = myCommitsList.data[i].commit.message.match(regex);
          let indx = jiraTicketNumber.indexOf(ticketNumber);
          if (ticketNumber != null && indx == -1) {
            jiraTicketNumber.push(ticketNumber);
          } else {
        
          }
        }
        console.log(jiraTicketNumber);
        for (let i = 0; i < jiraTicketNumber.length; i++) {
          promises.push(getJiraSummaryInfo(jiraTicketNumber[i]));
        }
        Promise.all(promises).then((values) => {
          resolve(values);
        });
      });
    });
  }
}

const dataHandler = new DataHandler();

module.exports = dataHandler;
