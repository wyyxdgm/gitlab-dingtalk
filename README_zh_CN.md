# gitlab-dingtalk

[英文](./README.md)
由于 GitLab 事件消息和钉钉的消息格式并不一致，因此无法直接推送。本项目作为中间服务来做消息转换，使得 GitLab 的事件可以推送到钉钉。

## 消息模板

### default

默认支持

### 自定义

在 `templates` 下新建文件夹导出各消息对象，参考 [templates/README.md](./templates/README.md)

以`templates/default/index.js`为例，如下

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
      messageUrl: `${_.repository.homepage}/commit/${checkout_sha}`,
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

## events

参考本地 gitlab `${host}/help/web_hooks/web_hooks`

- [Push 事件](#push-events)
- [Tag 事件](#tag-events)
- [Issues 事件](#issues-events)
- [评论 commit 事件](#comment-on-commit)
- [评论 MR 事件](#comment-on-merge-request)
- [评论 issue 事件](#comment-on-issue)
- [评论 code snippet 事件](#comment-on-code-snippet)

#### Push events

- `X-Gitlab-Event: Push Hook`

#### Tag events

- `X-Gitlab-Event: Tag Push Hook`

#### Issues events

- `X-Gitlab-Event: Issue Hook`

#### Comment on commit

- `X-Gitlab-Event: Note Hook`

#### Comment on merge request

- `X-Gitlab-Event: Note Hook`

#### Comment on issue

- `X-Gitlab-Event: Note Hook`

#### Comment on code snippet

- `X-Gitlab-Event: Merge Request Hook`
