// 基于express 起一个服务，端口process.env.PORT
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const dingtalkRobot = require("dingtalk-robot-multi-platform");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// process.env.TEMPLATE_NAME
const templateName = process.env.TEMPLATE_NAME || "default";
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
  let msgOption = template[fName]?.(data) || template._?.(data);
  await dingtalkRobot.send(msgOption);
  // 返回成功
  res.end("ok");
});

app.listen(port);
console.log(`Listening on port ${port}`);
