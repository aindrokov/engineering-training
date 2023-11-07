const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();
const dataHandler = require('./dataHandler');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get("/dataHandler", (req, res) => {
  //res.json({jirasObject:dataHandler.jirasObject});
  dataHandler.getJiraInfo().then((values) => {
    console.log(values);
    res.json({jirasObject:values});
  });
});

app.use('/', router);
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});