---
layout: post
title:  使用 git 和 pathogen 来管理 vim 插件
date: 2018-01-11 
categories: Essays
tag: github
---

使用 git 和 pathogen 来管理你的 vim 插件，无论是在跨机器同步还是记录你的 vim 配置都是一个不错的方案。该方案配置十分简单，大致可以分为以下四个步骤：

1. 初始化 vim git repo。
2. 安装 pathogen 管理 vim 插件。
3. 更新插件。
4. 在其它机器上同步配置。

{:.af-sectionDivider}
### 1. 初始化 git repo

将默认的 vim 配置放在一个目录中用 git 来管理。vim 默认是使用 home 目录下 `~/.vimrc` 文件和 `.vim` 目录（可以还有 `.gvimrc` 文件）来读取你的个人配置。现在我们把这些文件全部都放在同一个目录，并且初始化在 git repo 用 git 来管理。

```bash
# 将配置文件放在同一个目录中。
cd ~
mv .vimrc ~/.vim/vimrc
mv .gvimrc ~/.vim/gvimrc # 如果用 .gvimrc 的话。

# 创建配置文件软链
ln -s ~/.vim/vimrc ~/.vimrc
ln -s ~/.vim/gvimrc ~/.gvimrc

# 将 `~/.vim` 目录初始化成 git repo.
cd ~/.vim
git init

# 提交配置。
git add .
git commit -m 'Initial Commit'

# 将配置推送到 github 上。 
```

{:.af-sectionDivider}
### 2. 管理 vim 插件

vim 插件默认的安装方式是将插件的脚本文件拷贝到相应的 `.vim` 子目录中。例如如果你想安装 [vim-fugitive](https://github.com/tpope/vim-fugitive), 你需要将该插件的 [doc 文件](https://github.com/tpope/vim-fugitive/blob/master/doc/fugitive.txt) 和 [脚本文件](https://github.com/tpope/vim-fugitive/blob/master/plugin/fugitive.vim) 分别拷贝到 `~/.vim/doc` 和 `~/.vim/plugin` 目录中。

这样拷贝安装的步骤还是很麻烦的，特别是当插件更新了，你更新的插件的时候还是需要重新拷贝一遍。既然vim 的插件是 git 来管理的，那么我们为什么不也用 git 来管理 vim 插件的安装那？

[pathogen](https://github.com/tpope/vim-pathogen) 插件可以让我们将 vim 插件当作 bundle 来安装， 而不是像默认的复制目录文件的方式来管理，当 vim 插件更新时也更方便。

#### 安装 pathogen.

```bash
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
```

#### 开启 pathogen

将下面的代码放在 `.vimrc`  的文件类型检测（filetype detection）的前面，推荐放在文件的开始。

```bash
call pathogen#infect()
call pathogen#helptags()
```

#### 安装其它 vim 插件

开启了 pathogen 之后我们可以将其它 vim 插件通过 git 子模块的方式来安装。以 `fugitive` 为例。

```bash
cd ~/.vim/bundle
git submodule add http://github.com/tpope/vim-fugitive.git bundle/fugitive
git add .
git commit -m "Install Fugitive.vim bundle as a submodule."
```

其它插件的安装方法类似。

{:.af-sectionDivider}
### 3. 更新插件

当某个插件更新了之后，我们只需要到插件的目录用 git 更新下即可。如更新 `fugitive` :

```bash
cd ~/.vim/bundle/fugitive
git pull origin master
```

如果想一次性更新所有插件，可以使用下面的命令。

```bash
cd ~/.vim
git submodule foreach git pull origin master
```

{:.af-sectionDivider}
### 4. 在其它机器上同步

使 git 来管理并且同步了 github 上，就可以在其它机器上同步使用你的 vim 配置。可以使用下面命令来同步:

```bash
cd ~
git clone http://github.com/username/dotvim.git ~/.vim
ln -s ~/.vim/vimrc ~/.vimrc
ln -s ~/.vim/gvimrc ~/.gvimrc
cd ~/.vim
# 下在两个命令可以合并成一条： git submodule update --init.
git submodule init
git submodule update
```

{:.af-sectionDivider}
**注意**：vim 8 已经支持类似 pathogen 的原生插件管理方法, 所以你也可以不用 pathogen 🙃😁。 

#### 参考

1. [Synchronizing plugins with git submodules and pathogen](http://vimcasts.org/episodes/synchronizing-plugins-with-git-submodules-and-pathogen/)
2. [Vim: So long Pathogen, hello native package loading](https://shapeshed.com/vim-packages/)