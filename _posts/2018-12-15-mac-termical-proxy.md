---
layout: post
title: Mac 终端代理设置
date: 2018-12-15 17:12:35 +0800
categories: ABC
tag: Mac, Proxy, iTerm2
---

Mac 系统终端和 iTerm2 在请求网络时并不使用代理。那如果我们想使用代理怎么办？

其实很简单，直接在终端中设置 `http_proxy, https_proxy` 两个环境变量即 OK 了。`http_proxy, https_proxy`的内容是代理服务器地址。如：

```bash
export http_proxy=http://xx.xx.xx:8099
export http_proxy=http://xx.xx.xx:8099
```

{:.af-sectionDivider}
待って，问题来了， `http_proxy, https_proxy` 的值该填什么那？

假如，你已经搭建好了一个  [shadowsocks](https://github.com/shadowsocks/shadowsocks/tree/master) 服务器，可以通过浏览器来科学上网了。那么我们知道，shadowsocks 是使用 `pac`文件来自动代理的，它的 HTTP 协议的下一层使用的是 `SOCKS5`代理服务器来转发的。该 SOCKS5 服务器一般的地址是 `localhost:1080` 或 `127.0.0.1:1080`。

```bash
# 执行 lsof 命令来查看 1080 的使用情况。
sudo lsof -i :1080
```

既然，shadowsocks 使用 `localhost:1080` 来做代理，那么我们的终端的 http, https 也可以使用这个服务器作代理呀。即：

```bash
export http_proxy=http://localhost:1080
export https_proxy=http://localhost:1080
```

**不过，这是不行的。** 因为 `localhost:1080` 是 SOCKS5 服务器，并不是 HTTP 服务器。那我们该怎么解决那？

{:.af-sectionDivider}
### 解决方法

我们可以使用 [Privoxy](http://www.privoxy.org/)来解决这个问题。因为 Privoxy 除了可以直接代理 HTTP 层外，还可以将 HTTP 转发到 SOCKS5 服务器上。原理及具体操作如下：


<img src="/assets/imgs/2018-12-15-privoxy.jpg">

{:.af-figCaptionBottom}
Provixy

#### 1. 安装 Privoxy

```bash
brew install privoxy

The formula built, but is not symlinked into /usr/local
Could not symlink sbin/privoxy
/usr/local/sbin is not writable.

You can try again using:
  brew link privoxy
==> Caveats
To have launchd start privoxy now and restart at login:
  brew services start privoxy
Or, if you don't want/need a background service you can just run:
  privoxy /usr/local/etc/privoxy/config
```

#### 2. 编辑 `/usr/local/etc/privoxy/config` 文件

```bash
# 在文件最后加上这一句
# 告诉 Privoxy 我们要把 http, https 都转发到 socks5 代理服务器上去。
forward-socks5  / localhost:1080 .
```

#### 3. 设置 `http_proxy, https_proxy`变量

因为, Privoxy 服务启动之后，会在本地启动一个 `127.0.0.1:8118` 的代理服务器。所以们把终端下所有的 http 请求都转发到这个代理服务器上，然后这个代理服务器会把请求都转发到  SOCKS5 服务器上。

```bash
export http_proxy='http://localhost:8118'
export https_proxy='http://localhost:8118'
```

#### 4. 启动 Provixy 服务器

```bash
brew service provixy start
```

#### 5. 测试

```bash
~ ➜ curl ip.gs
Current IP / 当前 IP: xx.xx.xx.xx
lease visit https://ip.sb/ for more information. / IP.GS 已更改为 IP.SB ，请访问 https://ip.sb/ 获取更详细 IP 信息！
Please join Telegram group https://t.me/sbfans if you have any issues. / 如有问题，请加入 Telegram 群 https://t.me/sbfans

  /\_/\
=( °w° )=
  )   (  //
 (__ __)//
```

#### 最后

#### 参考