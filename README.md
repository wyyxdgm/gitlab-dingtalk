# gitlab-dingtalk

[中文](./README_zh_CN.md)
由于 GitLab 事件消息和钉钉的消息格式并不一致，因此无法直接推送。本项目作为中间服务来做消息转换，使得 GitLab 的事件可以推送到钉钉。

## 消息模板

## pushPush events

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
