// 基于express 起一个服务，端口process.env.PORT
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const DingtalkRobot = require("dingtalk-robot-multi-platform");
const assert = require("assert");

console.log("env:===========");
console.log("ACCESS_TOKEN=", process.env.ACCESS_TOKEN || "");
console.log("TEMPLATE=", process.env.TEMPLATE || "");
console.log("PORT=", process.env.PORT || "");
console.log("env:===========");

let dingtalkRobot = null;
if (process.env.ACCESS_TOKEN) dingtalkRobot = new DingtalkRobot(process.env.ACCESS_TOKEN);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// process.env.TEMPLATE
const templateName = process.env.TEMPLATE || "default";
const port = process.env.PORT || 6688;
const template = require(`./templates/${templateName}`);
const { HEADER_EVENTS_TO_KEY, PROP_TO_KEY } = require("./v");

// 处理 POST /webhook
app.post("/webhook", async (req, res) => {
  // 通过相关headers判断事件类型
  const event = req.headers["x-gitlab-event"];
  console.log(event);
  let fName = HEADER_EVENTS_TO_KEY[event];
  const data = req.body;
  if (!fName) {
    for (let k in PROP_TO_KEY) {
      if (data[k]) {
        fName = PROP_TO_KEY[k];
        break;
      }
    }
  }
  if (!fName) {
    return res.status(400).send("Bad Request");
  }
  let msgOption = (template[fName] && template[fName](data)) || (template._ && template._(data));
  if (req.query.access_token) {
    dingtalkRobot = new DingtalkRobot(req.query.access_token);
  }
  assert(dingtalkRobot, "access_token缺失");
  console.log(`send start`, msgOption);
  await dingtalkRobot.send(msgOption);
  console.log(`send success!`);
  // 返回成功
  res.status(200).send({ success: true, msg: "ok" });
});

app.listen(port);
console.log(`Listening on port ${port}`);
