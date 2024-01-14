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
  tag: (_) =>
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
  mr: (_) =>
    link({
      text: `mr:${_.object_attributes.title}\n${_.object_attributes.source_branch}->${_.object_attributes.target_branch}`,
      title: `gitlab事件[${_.object_kind}] by ${_.user.username}`,
      picUrl: `${_.user.avatar_url}`,
      messageUrl: `${_.object_attributes.url}`,
    }), // 采用默认, Merge Request 事件
};
