---
layout: post
title: 什么是 JSONP ?
date: 2016-05-29 19:12:35 +0800
categories: Essays
tag: JS
---

JSONP (JSON with Padding),  是一种解决跨域的一种方式。

{:.af-sectionDivider}
### 场景

如果网站，如 foo.qq.com 用 XMLHttpRequest 请求 baidu.com/api 的接口，两个网站不在同一个域下。此时如果对方接口的服务器没有开启 `Access-Control-Allow-Origin: http://foo.qq.com ` 那么就不能跨域请求该接口。如何饶过服务器设置来访问那？

解决方法可以用 JSONP 来完成，因为在 HTML 中， `<script src="http://baidu.com/api"></script> `,  script 标签是没有跨域限制的。



