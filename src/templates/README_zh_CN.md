# 模板

[English](./README.md)

每个模板需要导出如下数据对象

```ts
{
  _: MessageOption | null;
  push?: MessageOption | null;
  tag?: MessageOption | null;
  issues?: MessageOption | null;
  coc?: MessageOption | null;
  comr?: MessageOption | null;
  coi?: MessageOption | null;
  cocs?: MessageOption | null;
  mr?: MessageOption | null;
}
```

对应字段说明

| 属性   | 对应含义                                                     |
| ------ | ------------------------------------------------------------ |
| \_     | 默认处理，其他属性未定义或返回非 json 数据类型就默认为本方法 |
| push   | Push 事件                                                    |
| tag    | Tag 事件                                                     |
| issues | Issues 事件                                                  |
| coc    | 采用默认, 评论 commit 事件                                   |
| comr   | 采用默认, 评论 MR 事件                                       |
| coi    | 采用默认, 评论 issue 事件                                    |
| cocs   | 采用默认, 评论 code snippet 事件                             |
| mr     | 采用默认, Merge Request 事件                                 |

模板参考

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
  mr: () =>
    link({
      text: `mr:${_.object_attributes.title}\n${_.object_attributes.source_branch}->${_.object_attributes.target_branch}`,
      title: `gitlab事件[${_.object_kind}] by ${_.user.username}`,
      picUrl: `${_.user.avatar_url}`,
      messageUrl: `${_.repository.homepage}/merge_requests/${_.object_attributes.id}`,
    }), // 采用默认, Merge Request 事件
};
```
