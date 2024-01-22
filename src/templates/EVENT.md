# Event List

Refer to local gitlab `${host}/help/web_hooks/web_hooks`

- [Push events](#push-events)
- [Tag events](#tag-events)
- [Issues events](#issues-events)
- [Issues events](#issues-events)
- [Comment on merge request](#comment-on-merge-request)
- [Comment on issue](#comment-on-issue)
- [Comment on code snippet](#comment-on-code-snippet)
- [Merge request events](#merge-request-events)

## Push events

- Request header:

```
X-Gitlab-Event: Push Hook
```

- Special Data:

```
"object_kind": "push"
```

- Request body:

```json
{
  "object_kind": "push",
  "before": "95790bf891e76fee5e1747ab589903a6a1f80f22",
  "after": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
  "ref": "refs/heads/master",
  "checkout_sha": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
  "user_id": 4,
  "user_name": "John Smith",
  "user_email": "john@example.com",
  "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
  "project_id": 15,
  "project": {
    "name": "Diaspora",
    "description": "",
    "web_url": "http://example.com/mike/diaspora",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:mike/diaspora.git",
    "git_http_url": "http://example.com/mike/diaspora.git",
    "namespace": "Mike",
    "visibility_level": 0,
    "path_with_namespace": "mike/diaspora",
    "default_branch": "master",
    "homepage": "http://example.com/mike/diaspora",
    "url": "git@example.com:mike/diaspora.git",
    "ssh_url": "git@example.com:mike/diaspora.git",
    "http_url": "http://example.com/mike/diaspora.git"
  },
  "repository": {
    "name": "Diaspora",
    "url": "git@example.com:mike/diaspora.git",
    "description": "",
    "homepage": "http://example.com/mike/diaspora",
    "git_http_url": "http://example.com/mike/diaspora.git",
    "git_ssh_url": "git@example.com:mike/diaspora.git",
    "visibility_level": 0
  },
  "commits": [
    {
      "id": "b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
      "message": "Update Catalan translation to e38cb41.",
      "timestamp": "2011-12-12T14:27:31+02:00",
      "url": "http://example.com/mike/diaspora/commit/b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
      "author": {
        "name": "Jordi Mallach",
        "email": "jordi@softcatala.org"
      },
      "added": ["CHANGELOG"],
      "modified": ["app/controller/application.rb"],
      "removed": []
    },
    {
      "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "message": "fixed readme",
      "timestamp": "2012-01-03T23:36:29+02:00",
      "url": "http://example.com/mike/diaspora/commit/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "author": {
        "name": "GitLab dev user",
        "email": "gitlabdev@dv6700.(none)"
      },
      "added": ["CHANGELOG"],
      "modified": ["app/controller/application.rb"],
      "removed": []
    }
  ],
  "total_commits_count": 4
}
```

## Tag events

- Request header:

```
X-Gitlab-Event: Tag Push Hook
```

- Special Data:

```
"object_kind": "tag_push"
```

- Request body:

```json
{
  "object_kind": "tag_push",
  "before": "0000000000000000000000000000000000000000",
  "after": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
  "ref": "refs/tags/v1.0.0",
  "checkout_sha": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
  "user_id": 1,
  "user_name": "John Smith",
  "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
  "project_id": 1,
  "project": {
    "name": "Example",
    "description": "",
    "web_url": "http://example.com/jsmith/example",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:jsmith/example.git",
    "git_http_url": "http://example.com/jsmith/example.git",
    "namespace": "Jsmith",
    "visibility_level": 0,
    "path_with_namespace": "jsmith/example",
    "default_branch": "master",
    "homepage": "http://example.com/jsmith/example",
    "url": "git@example.com:jsmith/example.git",
    "ssh_url": "git@example.com:jsmith/example.git",
    "http_url": "http://example.com/jsmith/example.git"
  },
  "repository": {
    "name": "Example",
    "url": "ssh://git@example.com/jsmith/example.git",
    "description": "",
    "homepage": "http://example.com/jsmith/example",
    "git_http_url": "http://example.com/jsmith/example.git",
    "git_ssh_url": "git@example.com:jsmith/example.git",
    "visibility_level": 0
  },
  "commits": [],
  "total_commits_count": 0
}
```

## Issues events

- Request header:

```
X-Gitlab-Event: Issue Hook
```

- Special Data:

```
 "object_kind": "issue"
```

- Request body:

```json
{
  "object_kind": "issue",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "project": {
    "name": "Gitlab Test",
    "description": "Aut reprehenderit ut est.",
    "web_url": "http://example.com/gitlabhq/gitlab-test",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
    "git_http_url": "http://example.com/gitlabhq/gitlab-test.git",
    "namespace": "GitlabHQ",
    "visibility_level": 20,
    "path_with_namespace": "gitlabhq/gitlab-test",
    "default_branch": "master",
    "homepage": "http://example.com/gitlabhq/gitlab-test",
    "url": "http://example.com/gitlabhq/gitlab-test.git",
    "ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
    "http_url": "http://example.com/gitlabhq/gitlab-test.git"
  },
  "repository": {
    "name": "Gitlab Test",
    "url": "http://example.com/gitlabhq/gitlab-test.git",
    "description": "Aut reprehenderit ut est.",
    "homepage": "http://example.com/gitlabhq/gitlab-test"
  },
  "object_attributes": {
    "id": 301,
    "title": "New API: create/update/delete file",
    "assignee_id": 51,
    "author_id": 51,
    "project_id": 14,
    "created_at": "2013-12-03T17:15:43Z",
    "updated_at": "2013-12-03T17:15:43Z",
    "position": 0,
    "branch_name": null,
    "description": "Create new API for manipulations with repository",
    "milestone_id": null,
    "state": "opened",
    "iid": 23,
    "url": "http://example.com/diaspora/issues/23",
    "action": "open"
  },
  "assignee": {
    "name": "User1",
    "username": "user1",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  }
}
```

## Issues events

- Request header:

```
X-Gitlab-Event: Note Hook

```

- Special Data:

```
"object_kind": "note",
```

- Request body:

```json
{
  "object_kind": "note",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "project_id": 5,
  "project": {
    "name": "Gitlab Test",
    "description": "Aut reprehenderit ut est.",
    "web_url": "http://example.com/gitlabhq/gitlab-test",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
    "git_http_url": "http://example.com/gitlabhq/gitlab-test.git",
    "namespace": "GitlabHQ",
    "visibility_level": 20,
    "path_with_namespace": "gitlabhq/gitlab-test",
    "default_branch": "master",
    "homepage": "http://example.com/gitlabhq/gitlab-test",
    "url": "http://example.com/gitlabhq/gitlab-test.git",
    "ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
    "http_url": "http://example.com/gitlabhq/gitlab-test.git"
  },
  "repository": {
    "name": "Gitlab Test",
    "url": "http://example.com/gitlab-org/gitlab-test.git",
    "description": "Aut reprehenderit ut est.",
    "homepage": "http://example.com/gitlab-org/gitlab-test"
  },
  "object_attributes": {
    "id": 1243,
    "note": "This is a commit comment. How does this work?",
    "noteable_type": "Commit",
    "author_id": 1,
    "created_at": "2015-05-17 18:08:09 UTC",
    "updated_at": "2015-05-17 18:08:09 UTC",
    "project_id": 5,
    "attachment": null,
    "line_code": "bec9703f7a456cd2b4ab5fb3220ae016e3e394e3_0_1",
    "commit_id": "cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
    "noteable_id": null,
    "system": false,
    "st_diff": {
      "diff": "--- /dev/null\n+++ b/six\n@@ -0,0 +1 @@\n+Subproject commit 409f37c4f05865e4fb208c771485f211a22c4c2d\n",
      "new_path": "six",
      "old_path": "six",
      "a_mode": "0",
      "b_mode": "160000",
      "new_file": true,
      "renamed_file": false,
      "deleted_file": false
    },
    "url": "http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660#note_1243"
  },
  "commit": {
    "id": "cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
    "message": "Add submodule\n\nSigned-off-by: Dmitriy Zaporozhets \u003cdmitriy.zaporozhets@gmail.com\u003e\n",
    "timestamp": "2014-02-27T10:06:20+02:00",
    "url": "http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
    "author": {
      "name": "Dmitriy Zaporozhets",
      "email": "dmitriy.zaporozhets@gmail.com"
    }
  }
}
```

## Comment on merge request

- Request header:

```
X-Gitlab-Event: Note Hook

```

- Special Data:

```
"object_kind": "note",
"object_attributes": {}
"merge_request": {}
```

- Request body:

```json
{
  "object_kind": "note",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "project_id": 5,
  "project": {
    "name": "Gitlab Test",
    "description": "Aut reprehenderit ut est.",
    "web_url": "http://example.com/gitlab-org/gitlab-test",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
    "namespace": "Gitlab Org",
    "visibility_level": 10,
    "path_with_namespace": "gitlab-org/gitlab-test",
    "default_branch": "master",
    "homepage": "http://example.com/gitlab-org/gitlab-test",
    "url": "http://example.com/gitlab-org/gitlab-test.git",
    "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "http_url": "http://example.com/gitlab-org/gitlab-test.git"
  },
  "repository": {
    "name": "Gitlab Test",
    "url": "http://localhost/gitlab-org/gitlab-test.git",
    "description": "Aut reprehenderit ut est.",
    "homepage": "http://example.com/gitlab-org/gitlab-test"
  },
  "object_attributes": {
    "id": 1244,
    "note": "This MR needs work.",
    "noteable_type": "MergeRequest",
    "author_id": 1,
    "created_at": "2015-05-17 18:21:36 UTC",
    "updated_at": "2015-05-17 18:21:36 UTC",
    "project_id": 5,
    "attachment": null,
    "line_code": null,
    "commit_id": "",
    "noteable_id": 7,
    "system": false,
    "st_diff": null,
    "url": "http://example.com/gitlab-org/gitlab-test/merge_requests/1#note_1244"
  },
  "merge_request": {
    "id": 7,
    "target_branch": "markdown",
    "source_branch": "master",
    "source_project_id": 5,
    "author_id": 8,
    "assignee_id": 28,
    "title": "Tempora et eos debitis quae laborum et.",
    "created_at": "2015-03-01 20:12:53 UTC",
    "updated_at": "2015-03-21 18:27:27 UTC",
    "milestone_id": 11,
    "state": "opened",
    "merge_status": "cannot_be_merged",
    "target_project_id": 5,
    "iid": 1,
    "description": "Et voluptas corrupti assumenda temporibus. Architecto cum animi eveniet amet asperiores. Vitae numquam voluptate est natus sit et ad id.",
    "position": 0,
    "locked_at": null,
    "source": {
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlab-org/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
      "namespace": "Gitlab Org",
      "visibility_level": 10,
      "path_with_namespace": "gitlab-org/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlab-org/gitlab-test",
      "url": "http://example.com/gitlab-org/gitlab-test.git",
      "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "http_url": "http://example.com/gitlab-org/gitlab-test.git"
    },
    "target": {
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlab-org/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
      "namespace": "Gitlab Org",
      "visibility_level": 10,
      "path_with_namespace": "gitlab-org/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlab-org/gitlab-test",
      "url": "http://example.com/gitlab-org/gitlab-test.git",
      "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "http_url": "http://example.com/gitlab-org/gitlab-test.git"
    },
    "last_commit": {
      "id": "562e173be03b8ff2efb05345d12df18815438a4b",
      "message": "Merge branch 'another-branch' into 'master'\n\nCheck in this test\n",
      "timestamp": "2015-04-08T21: 00:25-07:00",
      "url": "http://example.com/gitlab-org/gitlab-test/commit/562e173be03b8ff2efb05345d12df18815438a4b",
      "author": {
        "name": "John Smith",
        "email": "john@example.com"
      }
    },
    "work_in_progress": false,
    "assignee": {
      "name": "User1",
      "username": "user1",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    }
  }
}
```

## Comment on issue

- Request header:

```
X-Gitlab-Event: Note Hook

```

- Special Data:

```
"object_kind": "note",
"object_attributes": {}
"issue": {}
```

- Request body:

```json
{
  "object_kind": "note",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "project_id": 5,
  "project": {
    "name": "Gitlab Test",
    "description": "Aut reprehenderit ut est.",
    "web_url": "http://example.com/gitlab-org/gitlab-test",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
    "namespace": "Gitlab Org",
    "visibility_level": 10,
    "path_with_namespace": "gitlab-org/gitlab-test",
    "default_branch": "master",
    "homepage": "http://example.com/gitlab-org/gitlab-test",
    "url": "http://example.com/gitlab-org/gitlab-test.git",
    "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "http_url": "http://example.com/gitlab-org/gitlab-test.git"
  },
  "repository": {
    "name": "diaspora",
    "url": "git@example.com:mike/diaspora.git",
    "description": "",
    "homepage": "http://example.com/mike/diaspora"
  },
  "object_attributes": {
    "id": 1241,
    "note": "Hello world",
    "noteable_type": "Issue",
    "author_id": 1,
    "created_at": "2015-05-17 17:06:40 UTC",
    "updated_at": "2015-05-17 17:06:40 UTC",
    "project_id": 5,
    "attachment": null,
    "line_code": null,
    "commit_id": "",
    "noteable_id": 92,
    "system": false,
    "st_diff": null,
    "url": "http://example.com/gitlab-org/gitlab-test/issues/17#note_1241"
  },
  "issue": {
    "id": 92,
    "title": "test",
    "assignee_id": null,
    "author_id": 1,
    "project_id": 5,
    "created_at": "2015-04-12 14:53:17 UTC",
    "updated_at": "2015-04-26 08:28:42 UTC",
    "position": 0,
    "branch_name": null,
    "description": "test",
    "milestone_id": null,
    "state": "closed",
    "iid": 17
  }
}
```

## Comment on code snippet

- Request header:

```
X-Gitlab-Event: Note Hook

```

- Special Data:

```
"object_kind": "note",
"object_attributes": {}
"snippet": {}
```

- Request body:

```json
{
  "object_kind": "note",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "project_id": 5,
  "project": {
    "name": "Gitlab Test",
    "description": "Aut reprehenderit ut est.",
    "web_url": "http://example.com/gitlab-org/gitlab-test",
    "avatar_url": null,
    "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
    "namespace": "Gitlab Org",
    "visibility_level": 10,
    "path_with_namespace": "gitlab-org/gitlab-test",
    "default_branch": "master",
    "homepage": "http://example.com/gitlab-org/gitlab-test",
    "url": "http://example.com/gitlab-org/gitlab-test.git",
    "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
    "http_url": "http://example.com/gitlab-org/gitlab-test.git"
  },
  "repository": {
    "name": "Gitlab Test",
    "url": "http://example.com/gitlab-org/gitlab-test.git",
    "description": "Aut reprehenderit ut est.",
    "homepage": "http://example.com/gitlab-org/gitlab-test"
  },
  "object_attributes": {
    "id": 1245,
    "note": "Is this snippet doing what it's supposed to be doing?",
    "noteable_type": "Snippet",
    "author_id": 1,
    "created_at": "2015-05-17 18:35:50 UTC",
    "updated_at": "2015-05-17 18:35:50 UTC",
    "project_id": 5,
    "attachment": null,
    "line_code": null,
    "commit_id": "",
    "noteable_id": 53,
    "system": false,
    "st_diff": null,
    "url": "http://example.com/gitlab-org/gitlab-test/snippets/53#note_1245"
  },
  "snippet": {
    "id": 53,
    "title": "test",
    "content": "puts 'Hello world'",
    "author_id": 1,
    "project_id": 5,
    "created_at": "2015-04-09 02:40:38 UTC",
    "updated_at": "2015-04-09 02:40:38 UTC",
    "file_name": "test.rb",
    "expires_at": null,
    "type": "ProjectSnippet",
    "visibility_level": 0
  }
}
```

## Merge request events

- Request header:

```
X-Gitlab-Event: Merge Request Hook

```

- Special Data:

```
"object_kind": "merge_request"
"object_attributes": {}
"assignee": {}
```

- Request body:

```json
{
  "object_kind": "merge_request",
  "user": {
    "name": "Administrator",
    "username": "root",
    "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
  },
  "object_attributes": {
    "id": 99,
    "target_branch": "master",
    "source_branch": "ms-viewport",
    "source_project_id": 14,
    "author_id": 51,
    "assignee_id": 6,
    "title": "MS-Viewport",
    "created_at": "2013-12-03T17:23:34Z",
    "updated_at": "2013-12-03T17:23:34Z",
    "st_commits": null,
    "st_diffs": null,
    "milestone_id": null,
    "state": "opened",
    "merge_status": "unchecked",
    "target_project_id": 14,
    "iid": 1,
    "description": "",
    "source": {
      "name": "Awesome Project",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/awesome_space/awesome_project",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:awesome_space/awesome_project.git",
      "git_http_url": "http://example.com/awesome_space/awesome_project.git",
      "namespace": "Awesome Space",
      "visibility_level": 20,
      "path_with_namespace": "awesome_space/awesome_project",
      "default_branch": "master",
      "homepage": "http://example.com/awesome_space/awesome_project",
      "url": "http://example.com/awesome_space/awesome_project.git",
      "ssh_url": "git@example.com:awesome_space/awesome_project.git",
      "http_url": "http://example.com/awesome_space/awesome_project.git"
    },
    "target": {
      "name": "Awesome Project",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/awesome_space/awesome_project",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:awesome_space/awesome_project.git",
      "git_http_url": "http://example.com/awesome_space/awesome_project.git",
      "namespace": "Awesome Space",
      "visibility_level": 20,
      "path_with_namespace": "awesome_space/awesome_project",
      "default_branch": "master",
      "homepage": "http://example.com/awesome_space/awesome_project",
      "url": "http://example.com/awesome_space/awesome_project.git",
      "ssh_url": "git@example.com:awesome_space/awesome_project.git",
      "http_url": "http://example.com/awesome_space/awesome_project.git"
    },
    "last_commit": {
      "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "message": "fixed readme",
      "timestamp": "2012-01-03T23:36:29+02:00",
      "url": "http://example.com/awesome_space/awesome_project/commits/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "author": {
        "name": "GitLab dev user",
        "email": "gitlabdev@dv6700.(none)"
      }
    },
    "work_in_progress": false,
    "url": "http://example.com/diaspora/merge_requests/1",
    "action": "open",
    "assignee": {
      "name": "User1",
      "username": "user1",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    }
  }
}
```
