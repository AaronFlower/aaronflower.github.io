---
layout: post
title: stdin、stdout、stderr
categories: essay
tag: unix, linux
---


## stderr, stdout, stdin

在 Unix-Like 系统中一个进程总可以访问三个文件描述符是：0，1，2；其分别代表 stdin, stdout, stderr。在我们执行一些命令的时候正确的 stdout, stderr 的信息很方便我们查看相应的信息。

### Standard error(stderr)

标准错误输出是另一种 output stream 用来输出程序的错误信息或调试信息(error messages or diagnostics)。它和标准输出流相互独立可以分别进行重定向。注意，程序的输出可以在管道中重定向，但是错误或调试信息仍然被输出到终端中。如果想抑制错误信息，需要我们对 stderr 进程重定向。

### All About Redirection

测试准备，在这个测试目录 `foo` 中有一个 `bar.txt` 文件和一个空目录 `dir`。

```bash
foo ➜ tree
.
├── bar.txt
└── dir

1 directory, 1 file
foo ➜ cat bar.txt
stderr
stdout
stdin
```

1. `stdout` to a file

```bash
➜ ls -l > ls-l.txt
➜ ll
total 16
-rw-r--r--  1 easonzhan  staff    20B Dec 25 14:54 bar.txt
drwxr-xr-x  2 easonzhan  staff    64B Dec 25 14:55 dir
-rw-r--r--  1 easonzhan  staff   173B Dec 25 15:21 ls-l.txt
```

2. `stderr` to a file

```bash
➜ grep std *
bar.txt:stderr
bar.txt:stdout
bar.txt:stdin
grep: dir: Is a directory
```

这个命令的输出有两部分，一部分是 grep 正常的输出结果，而 `grep: dir: Is a directory` 是错误输出。可以对这两部分信息进行以下处理：

```bash
# a. 丢掉错误输出
grep std * 2> /dev/null

# b. 丢掉正确输出
grep std * 1> /dev/null

# c. mute 所有的输出
grep std * &> /dev/null

# d. 正确和错误输出分别输出到两个文件中。
grep std * 1> grep.out.txt 2> grep.err.txt

# e. 将正确和错误输出到同一个文件中
grep std * &> grep.all.txt
```

3. `stderr` 与 `stdout`相互转换

```bash
# stderr 转 stdout
grep std * 2>&1

# stdout 转 stderr
grep std * 1>&2

```

### `nginx -v`

注意因为 stderr 的信息是无法 `grep` 的，所以我们可以把 stderr 的信息转换到 stdout 上再 `grep`.

![image-20181225153449442](/assets/imgs/2018-12-25-grep-stderr.png)

这个很重要，因为有些命令的输出是到调试信息中的。如 `nginx -V`。

![image-20181225154312654](/assets/imgs/2018-12-25-nginx-v.png)

然后可以用下面的命令来查看， Nginx 的  module 信息。`nginx -V 2>&1|sed 's/--/\'$'\n--/g'`。

```bash
# 将 nginx 的 stderr 调试信息重向到 stdout 中，然后用 sed 进行替换。
nginx -V 2>&1|sed 's/--/\'$'\n--/g'

nginx version: nginx/1.13.10
built by clang 9.0.0 (clang-900.0.39.2)
built with OpenSSL 1.0.2n  7 Dec 2017 (running with OpenSSL 1.0.2q  20 Nov 2018)
TLS SNI support enabled
configure arguments:
--prefix=/usr/local/Cellar/nginx/1.13.10
--sbin-path=/usr/local/Cellar/nginx/1.13.10/bin/nginx
--with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl/include'
--with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl/lib'
--conf-path=/usr/local/etc/nginx/nginx.conf
--pid-path=/usr/local/var/run/nginx.pid
--lock-path=/usr/local/var/run/nginx.lock
--http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp
--http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp
--http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp
--http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp
--http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp
--http-log-path=/usr/local/var/log/nginx/access.log
--error-log-path=/usr/local/var/log/nginx/error.log
--with-debug
--with-http_addition_module
--with-http_auth_request_module
--with-http_dav_module
--with-http_degradation_module
--with-http_flv_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_mp4_module
--with-http_random_index_module
--with-http_realip_module
--with-http_secure_link_module
--with-http_slice_module
--with-http_ssl_module
--with-http_stub_status_module
--with-http_sub_module
--with-http_v2_module
--with-ipv6
--with-mail
--with-mail_ssl_module
--with-pcre
--with-pcre-jit
--with-stream
--with-stream_realip_module
--with-stream_ssl_module
--with-stream_ssl_preread_module
```

用 `gsed` 更加方便些：`nginx -V 2>&1 | gsed 's/--/\n--/g'`.

mac 安装 gun-sed: `brew install gun-sed`。
