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
// template格式<{
//   _: MessageOption | null;
//   push?: MessageOption | null;
//   tag?: MessageOption | null;
//   issues?: MessageOption | null;
//   coc?: MessageOption | null;
//   comr?: MessageOption | null;
//   coi?: MessageOption | null;
//   cocs?: MessageOption | null;
// }>

// headers列表如下：
// `X-Gitlab-Event: Push Hook`
// `X-Gitlab-Event: Tag Push Hook`
// `X-Gitlab-Event: Issue Hook`
// `X-Gitlab-Event: Note Hook` // _.commit
// `X-Gitlab-Event: Note Hook` // _.assignee
// `X-Gitlab-Event: Note Hook` // _.issue
// `X-Gitlab-Event: Merge Request Hook` _.snippet
// key列表：push/tag/issues/coc/comr/coi/cocs

//  headers列表和 key列表对应关系
const HEADER_EVENTS_TO_KEY = {
  "Push Hook": "push",
  "Tag Push Hook": "tag",
  "Issue Hook": "issues",
  // "Note Hook": "coc",
  // "Note Hook": "comr",
  // "Note Hook": "coi",
  // "Note Hook": "cocs",
  "Merge Request Hook": "mr",
};

// 用于判断req.body中是否有key，有key使用value对应方法
const PROP_TO_KEY = {
  commit: "coc",
  assignee: "comr",
  issue: "coi",
  snippet: "cocs",
};

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
