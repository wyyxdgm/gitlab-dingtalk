# gitlab-dingtalk

[English](./README.md)

由于 GitLab 事件消息和钉钉的消息格式并不一致，因此无法直接推送。本项目作为中间服务来做消息转换，使得 GitLab 的事件可以推送到钉钉。

## 快速开始

### 准备

1. 新建机器人，获取`access_token`，[参考文档](https://open.dingtalk.com/document/robots/custom-robot-access)
2. 链接填写到 gitlab 的`web钩子`中 `http://${yourhost}:6688/webhook?access_token=${access_token}`

提示: 本项目支持单机器人或多个机器人的模式，默认机器人可通过环境变量`ACCESS_TOKEN`设置，多机器人只需在链接上添加 `access_token` 参数进行区分
链接如下：

```bash
http://${yourhost}:6688/webhook # 默认机器人
http://${yourhost}:6688/webhook?access_token=${access_token1} # access_token1机器人
http://${yourhost}:6688/webhook?access_token=${access_token2} # access_token2机器人
```

如果不存在环境变量`ACCESS_TOKEN`也不传递参数会报错

### Node

用机器人的`access_token`替换如下代码中的 `${access_token}`

```bash
npm install -g pm2
git clone git@github.com:wyyxdgm/gitlab-dingtalk.git
cd gitlab-dingtalk && npm install
ACCESS_TOKEN=${access_token} && \
TEMPLATE=default && PORT=6688 && \
npm start
```

### Docker

用机器人的`access_token`替换如下代码中的 `${access_token}`

```bash
docker run -e ACCESS_TOKEN=${access_token} -e TEMPLATE=default -e PORT=6688 -p 6688:6688 -d wyyxdgm/gitlab-dingtalk
```

### Docker Compose

创建`docker-compose.yml`如下：
用机器人的`access_token`替换如下代码中的 `${access_token}`

```yml
version: "3"
services:
  app:
    image: "wyyxdgm/gitlab-dingtalk"
    restart: always
    container_name: gitlab-dingtalk
    ports:
      - "6688:6688"
    environment:
      - ACCESS_TOKEN=${access_token}
      - PORT=6688
      - TEMPLATE=default
    command: ["npm", "start"]
```

执行

```bash
# 启动
docker compose -f docker-compose.yml up -d
# 关闭
docker compose -f docker-compose.yml down
```

## 消息模板

### 默认模板

默认模板文件在`src/templates/default/index.js`，可以直接根据[模板规范](./src/templates/README.md)修改，代码如下：

```js
/**
 * text 类型
 * text String 必填 文本内容
 * isAtAll 选填 是否抄送所有人
 */
function text(text = "", isAtAll = false) {
  return {
    msgtype: "text",
    text: {
      content: text,
    },
    at: {
      isAtAll: isAtAll,
    },
  };
}

/**
 * link类型
 * text String 必填 文本内容
 * title String 必填 消息标题
 * picUrl String 必填 展示图片
 * messageUrl String 必填 点击消息跳转的URL
 */
function link(linkObject) {
  return {
    msgtype: "link",
    link: linkObject,
  };
}
module.exports = {
  _: (_) => text(`gitlab事件[${_.object_kind}]`), // default
  push: (_) =>
    link({
      text: _.commits.map((c) => c.message).join("\n"),
      title: `gitlab事件[${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/commit/${_.checkout_sha}`,
    }), // Push 事件
  tag: () =>
    link({
      text: `tag:${_.ref}`,
      title: `gitlab事件[${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/tags/${_.ref.replace("refs/tags/", "")}`,
    }), // Tag 事件
  issues: () => null, // Issues 事件
  coc: () => null, // 采用默认, 评论 commit 事件
  comr: () => null, // 采用默认, 评论 MR 事件
  coi: () => null, // 采用默认, 评论 issue 事件
  cocs: () => null, // 采用默认, 评论 code snippet 事件
};
```

### 本地自定义模板

1. 选择一个本地目录作为模板目录，比如`./default`
2. 拷贝一份[src/templates/default/index.js](src/templates/default/index.js) 到 `./default/index.js`。
3. 参考 [src/templates/README.md](./src/templates/README.md)调整`./default/index.js`内容
4. 通过如下方式启动：

- Docker

替换其中 `./default` 为本地模板文件夹路径 以及 `${access_token}`后执行

```bash
docker run --privileged -e ACCESS_TOKEN=${access_token} \
-e TEMPLATE=default -e PORT=6688 -p 6688:6688 \
-v ./default:/opt/app/src/templates/default \
-d wyyxdgm/gitlab-dingtalk
```

- Docker Compose

新建`docker-compose.yml`，内容如下：

```yml
version: "3"
services:
  app:
    image: "wyyxdgm/gitlab-dingtalk"
    restart: always
    container_name: gitlab-dingtalk
    ports:
      - "6688:6688"
    environment:
      - ACCESS_TOKEN=${access_token}
      - PORT=6688
      - TEMPLATE=default
    volumes:
      - ./default:/opt/app/src/templates/default
    privileged: true
    command: ["npm", "start"]
```

替换其中 `./default` 为本地模板文件夹路径 以及 `${access_token}`后执行

```bash
# 启动
docker compose -f docker-compose.yml up -d
```

### 本地多模板切换

新建`templates`文件夹，用于存放多个模板文件夹如下:

```bash
./templates
├── default
│   └── index.js
├── template1
│   └── index.js
└── template2
    └── index.js
```

- Docker

替换其中 `${template_name}` 为本地模板子文件夹名称，以及 `${access_token}`后执行

```bash
docker run --privileged -e ACCESS_TOKEN=${access_token} \
-e TEMPLATE=${template_name} -e PORT=6688 -p 6688:6688 \
-v ./tempaltes:/opt/app/src/templates \
-d wyyxdgm/gitlab-dingtalk
```

- Docker Compose

`docker-compose.yml`内容如下：

```yml
version: "3"
services:
  app:
    image: "wyyxdgm/gitlab-dingtalk"
    restart: always
    container_name: gitlab-dingtalk
    ports:
      - "6688:6688"
    environment:
      - ACCESS_TOKEN=${access_token}
      - PORT=6688
      - TEMPLATE=${template_name}
    volumes:
      - ./tempaltes:/opt/app/src/templates
    privileged: true
    command: ["npm", "start"]
```

替换`./tempaltes`为本地模板文件夹路径，替换模板名称`${template_name}`，以及 `${access_token}`后执行

```bash
# 启动
docker compose -f docker-compose.yml up -d
```

## 事件列表

参考本地 gitlab `${host}/help/web_hooks/web_hooks`。详细事件的数据参考[EVENT.md](./src/templates/EVENT.md)

- [Push 事件](#push-events)
- [Tag 事件](#tag-events)
- [Issues 事件](#issues-events)
- [评论 commit 事件](#comment-on-commit)
- [评论 MR 事件](#comment-on-merge-request)
- [评论 issue 事件](#comment-on-issue)
- [评论 code snippet 事件](#comment-on-code-snippet)
- [合并 事件](#merge-request-events)

#### Push events

- header: `X-Gitlab-Event: Push Hook`
- 默认 Link 模板

#### Tag events

- header: `X-Gitlab-Event: Tag Push Hook`
- 默认 Link 模板

#### Issues events

- header: `X-Gitlab-Event: Issue Hook`
- 默认 Text 模板

#### Comment on commit

- header: `X-Gitlab-Event: Note Hook`
- 默认 Text 模板

#### Comment on merge request

- header: `X-Gitlab-Event: Note Hook`
- 默认 Text 模板

#### Comment on issue

- header: `X-Gitlab-Event: Note Hook`
- 默认 Text 模板

#### Comment on code snippet

- header: `X-Gitlab-Event: Merge Request Hook`
- 默认 Text 模板

#### Merge request events

- header: `X-Gitlab-Event: Merge Request Hook`
- 默认 Link 模板
