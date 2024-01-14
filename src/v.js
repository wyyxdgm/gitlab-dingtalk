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
module.exports.HEADER_EVENTS_TO_KEY = {
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
module.exports.PROP_TO_KEY = {
  commit: "coc",
  assignee: "comr",
  issue: "coi",
  snippet: "cocs",
};
