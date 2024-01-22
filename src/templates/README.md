# Template

[中文](./README_zh_CN.md)
Each template needs to export the following data objects

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

Explanation of corresponding fields

| Property | Corresponding Meaning                                                   |
| -------- | ----------------------------------------------------------------------- |
| \_       | Default processing, other properties undefined or non-json data default |
| push     | Push event                                                              |
| tag      | Tag event                                                               |
| issues   | Issues event                                                            |
| coc      | Default, comment commit event                                           |
| comr     | Default, comment MR event                                               |
| coi      | Default, comment issue event                                            |
| cocs     | Default, comment on code snippet event                                  |
| mr       | Default, Merge Request event                                            |

Template Reference

```js
/**
 * text type
 * text String Required Text content
 * isAtAll Optional Whether to copy all people
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
 * messageUrl String Required URL to jump to when clicking on the message
 */
function link(linkObject) {
  return {
    msgtype: "link",
    link: linkObject,
  };
}

module.exports = {
  _: (_) => text(`gitlab event [${_.object_kind}]`), // default
  push: (_) =>
    link({
      text: _.commits.map((c) => c.message).join("\n"),
      title: `gitlab event [${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/commit/${_.checkout_sha}`,
    }), // Push event
  tag: (_) =>
    link({
      text: `tag:${_.ref}`,
      title: `gitlab event [${_.object_kind}] by ${_.user_name}`,
      picUrl: `${_.user_avatar}`,
      messageUrl: `${_.repository.homepage}/tags/${_.ref.replace("refs/tags/", "")}`,
    }), // Tag event
  issues: () => null, // Issues event
  coc: () => null, // Adopt default, comment on commit event
  comr: () => null, // Adopt default, comment MR event
  coi: () => null, // Adopt default, comment issue event
  cocs: () => null, // Adopt default, comment on code snippet event
  mr: (_) =>
    link({
      text: `mr:${_.object_attributes.title}\n${_.object_attributes.source_branch}->${_.object_attributes.target_branch}`,
      title: `gitlab event [${_.object_kind}] by ${_.user.username}`,
      picUrl: `${_.user.avatar_url}`,
      messageUrl: `${_.repository.homepage}/merge_requests/${_.object_attributes.id}`,
    }), // Adopt default, Merge Request event
};
f;
```
