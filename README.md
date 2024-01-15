# gitlab-dingtalk

[中文](./README_zh_CN.md)

Due to the inconsistent message formats between GitLab event notifications and DingTalk, a direct push is not feasible. This project serves as an intermediary service for message translation, which enables the push of GitLab events to DingTalk.

## Quick Start

### Preparation

1. Create a new robot and obtain `access_token`. Refer to this [document](https://open.dingtalk.com/document/robots/custom-robot-access)
2. Insert this link into GitLab's `webhook`: `http://${yourhost}:6688/webhook?access_token=${access_token}`

Note: This project supports both single robot and multiple robots mode. The default robot can be set by the environment variable `ACCESS_TOKEN`. For multiple robots, you only need to add the `access_token` parameter to the link for distinction. The links are as follows:

```bash
http://${yourhost}:6688/webhook # default robot
http://${yourhost}:6688/webhook?access_token=${access_token1} # robot with access_token1
http://${yourhost}:6688/webhook?access_token=${access_token2} # robot with access_token2
```

If the `ACCESS_TOKEN` environment variable does not exist and no parameter is passed, an error will be reported.

### Node

```bash
npm install -g pm2
git clone git@github.com:wyyxdgm/gitlab-dingtalk.git
cd gitlab-dingtalk && npm install
ACCESS_TOKEN=${access_token} && \
TEMPLATE=default && PORT=6688 && \
npm start
```

### Docker

Replace the `access_token` in the following code with the robot's `access_token`.

```bash
docker run -e ACCESS_TOKEN=${access_token} -e TEMPLATE=default -e PORT=6688 -p 6688:6688 -d wyyxdgm/gitlab-dingtalk
```

### Docker Compose

Create docker-compose.yml as follows:Replace `${access_token}` with the robot's `access_token`.

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

Execute

```bash
# Start up
docker compose -f docker-compose.yml up -d
# Shut down
docker compose -f docker-compose.yml down
```

## Message Templates

### Default Template

Default supported

### Custom

Create a new folder under `templates` and export each message object, refer to [src/templates/README.md](./src/templates/README.md)
Take the default template as an example:In the file templates/default/index.js, the code is as follows:

```js
/**
 * text type
 * text String Required Text content
 * isAtAll Optional Whether copying everyone or not
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
 * link type
 * text String Required Text content
 * title String Required Message title
 * picUrl String Required Display picture
 * messageUrl String Required URL to be redirected after clicking the message
 */
function link(linkObject) {
  return {
    msgtype: "link",
    link: linkObject,
  };
}
module.exports = {
  _: (_) => text(`gitlab event[${_.object_kind}]`), // default
  push: (_) =>
    link({
      text: _.commits.map((c) => c.message).join("\n"),
      title: `gitlab event[${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/commit/${_.checkout_sha}`,
    }), // Push event
  tag: () =>
    link({
      text: `tag:${_.ref}`,
      title: `gitlab event[${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/tags/${_.ref.replace("refs/tags/", "")}`,
    }), // Tag event
  issues: () => null, // Issues event
  coc: () => null, // Applying default, comment on commit event
  comr: () => null, // Applying default, comment on MR event
  coi: () => null, // Applying default, comment on issue event
  cocs: () => null, // Applying default, comment on code snippet event
};
```

## Event List

Refer to local gitlab `${host}/help/web_hooks/web_hooks`

- [Push events](#push-events)
- [Tag events](#tag-events)
- [Issues events](#issues-events)
- [Comment on commit](#comment-on-commit)
- [Comment on merge request](#comment-on-merge-request)
- [Comment on issue](#comment-on-issue)
- [Comment on code snippet](#comment-on-code-snippet)
- [Merge request events](#merge-request-events)

#### Push events

- header: `X-Gitlab-Event: Push Hook`
- default template: Link

#### Tag events

- header: `X-Gitlab-Event: Tag Push Hook`
- default template: Link

#### Issues events

- header: `X-Gitlab-Event: Issue Hook`
- default template: Text

#### Comment on commit

- header: `X-Gitlab-Event: Note Hook`
- default template: Text

#### Comment on merge request

- header: `X-Gitlab-Event: Note Hook`
- default template: Text

#### Comment on issue

- header: `X-Gitlab-Event: Note Hook`
- default template: Text

#### Comment on code snippet

- header: `X-Gitlab-Event: Merge Request Hook`
- default template: Text

#### Merge request events

- header: `X-Gitlab-Event: Merge Request Hook`
- default template: Link
