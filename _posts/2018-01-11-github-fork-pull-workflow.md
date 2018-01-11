---
layout: post
title:  Github 标准 Fork & Pull Request 流程
date: 2018-01-11 
categories: Essays
tag: github
---

原文 [GitHub Standard Fork & Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

开源社区 save your time！当你想回报 Github 社区，或者用 Git 管理与别人合作的项目时，了解怎么正确的 fork & pull request 是非常必要的。但是，如果你不熟悉这个流程的话，则可能会出错。

这个简单的手册介绍一个相对来说标准的流程：创建 fork, 开发，发起 Pull Request, 以及 merge Pull Request。

{:.af-sectionDivider}
### 创建 Fork

很简单，到 Github 主页上单击 "fork" 按钮。然后在开发目录中执行下面的命令 clone 你 fork 的项目代码。

```bash
# Clone your fork to your local machine
git clone git@github.com:USERNAME/FORKED-PROJECT.git
```

{:.af-sectionDivider}
### Fork 与 upstream 保持一致 

虽然这不是必要的一步，但是如果你想参与更多而不是仅仅做一个 quick fix, 你需要保证你的代码与远程原始代码库 (the original "upstream" repo) 保持一致。做到这一步，你仅需要设置下 remote:

```bash
# Add 'upstream' repo to list of remotes
git remote add upstream https://github.com/UPSTREAM-USER/ORIGINAL-PROJECT.git

# Verify the new remote named 'upstream'
git remote -v
```

当你想更新远程代码到你的 fork 时，**首先**你需要 fetch 原始上游分支的最新提交到你的项目中：

````bash
# Fetch from upstream remote
git fetch upstream

# View all branches, including those from upstream
git branch -va
````

**然后**，将上游远程 master 合并到你的 master 分支上：

```bash
# Checkout your master branch and merge upstream
git checkout master
git merge upstream/master
```

*注意*：如果与上游用非 master 分支交流，则改成相应的分支。

在 merge 过程中，如果没有冲突 git 会执行 fast-forward 合并。如果有冲突的话，请尊重上游的更改解决冲突。现在你的项目就与 upstream 保持一致了。

{:.af-sectionDivider}
### 开发

#### 创建新的分支 Branch

无论什么时候，你想开发一个新的 feature 或者 bugfix, 创建一个新的分支很重要。这不仅仅是正确的 git 工作流，而是这样你的开发的 feature 变化与 master 分支分隔，当每完成一个任务时就可发起 pull request.

创建新分支，开始工作：

```bash
# Checkout the master branch - you want your new branch to come from master
git checkout master

# Create a new branch named newfeature (give your branch its own simple informative name)
git branch newfeature

# Switch to your new branch
git checkout newfeature
```

 现在，你就可以开发你的 feture 或者做 bugfix 了。

{:.af-sectionDivider}
### 发起 Pull Request

当你的功能开发完成后可以发起 Pull Request。

> 开发者向团队成员通知功能开发已经完成，`Pull Requests`是最简单的用法。开发者完成功能开发后，发起一个`Pull Request`。这样让涉及这个功能的所有人知道，要去做`Code Review`和合并到`master`分支。
>
> `Pull Request`远不止一个简单的通知，而是为讨论提交的功能的一个专门论坛。如果变更有任何问题，团队成员反馈在`Pull Request`中，甚至`push`新的提交微调功能。所有的这些活动都直接跟踪在`Pull Request`中。

#### Cleaning up your work

在发起 Pull Request 之前，你可能需要整理下你的分支以保持尽可能的简洁。这样其它维护者可以更方便的测试，accept, merge 你的代码。

如有上游的 master 分支有了新的提交，你需要 rebase 你的开发分支以保证在 merge 时不会有冲突能够执行 fast-forward  。

```bash
# Fetch upstream master and merge with your repo's master branch
git fetch upstream
git checkout master
git merge upstream/master

# If there were any new commits, rebase your development branch
git checkout newfeature
git rebase master
```

再者，在开发的时候你的提交历史可能很混乱，你可以重新整理 squash 你的提交，以保持精简。你可以使用交互式 rebase:

```bash
# Rebase all commits on your development branch
git checkout 
git rebase -i master
```

#### 提交 push request

做完上面的步骤，可以到你的 github 主页上，选择你的开发分支然后单击 pull request 按钮发起 pull request. 如果之后有新的调整，你只需要直接 push 更新的到 github 上就行了。你发起的 pull request 会跟踪的更新。

{:.af-sectionDivider}
### 接受合并 Pull Request

如是你仅仅是代码贡献者，自己不是该项目的管理者。那你的流程就已经结束了，因为这部分是写给上游原始代码库的 owner 的。Owner 要来处理 Pull Request.

#### Checking out & Testing Pull Requests

打开 `.git/config` 文件，在 `[remote "origin"]` 后添加一行：

```bash
fetch = +refs/pull/*/head:refs/pull/origin/*
```

现在，你可以 fetch , checkout 做任意一个 pull request ，以方便你测试它们。

```shell
# Fetch all pull request branches
git fetch origin

# Checkout out a given pull request branch based on its number
git checkout -b 999 pull/origin/999
```

**注意**： 这些分支你只能测试，而不能变更后提交更新。

#### 自动 Merge Pull Request

如果 Pull Request 是一个 fast-forward 非常简单的功能，你可以直接在 Github 页面上单击 merge 来自动 merge request.

#### 手动 Merge Pull Request

做手动 Merge ，你需要 checkout 源代码库的目标分支，拉下来 fork， 进行 merge 然后 push .

```shell
# Checkout the branch you're merging to in the target repo
git checkout master

# Pull the development branch from the fork repo where the pull request development was done.
git pull https://github.com/forkuser/forkedrepo.git newfeature

# Merge the development branch
git merge newfeature

# Push master with the new feature merged into it
git push origin master
```

最后你就可以删除你的开发分支了, up to you。

```bash
git branch -d newfeature
```

{:.af-sectionDivider}
**Additional Reading**

* [Atlassian - Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

**Sources**
* [GitHub - Fork a Repo](https://help.github.com/articles/fork-a-repo)
* [GitHub - Syncing a Fork](https://help.github.com/articles/syncing-a-fork)
* [GitHub - Checking Out a Pull Request](https://help.github.com/articles/checking-out-pull-requests-locally)