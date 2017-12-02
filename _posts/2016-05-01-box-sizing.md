---
layout: post
title: CSS, box-sizing best practice
date: 2016-05-01 19:12:35 +0800
categories: Essays
tag: CSS
---

<img src="/assets/imgs/2016-05-01-box-sizing.svg">

{:.af-figCaptionBottom}
Box-sizing for what?

{:.af-sectionDivider}

*box-sizing* 属性用于更改用于计算元素宽度和高度的默认的 [CSS 盒子模型](https://developer.mozilla.org/en-US/docs/CSS/Box_model)。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为。主要解决的问题还是 IE 低版本的计算问题。

记住*最佳实践*：一些专家甚至建议所有的Web开发者们[将所有的元素的box-sizing都设为border-box](https://css-tricks.com/international-box-sizing-awareness-day/)

### 最佳实践代码

<script src="https://gist.github.com/AaronFlower/38bd3ff859012e40b086254a262a43a3.js"></script>

#### [可能比最佳实践更好的代码](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)

这样当你重写一个元素的 box-sizing 的时候，那么它的子元素也会继承你新的重写的 box-sizing 值。
<script src="https://gist.github.com/AaronFlower/018ef3340b5b531f2229bcc9338f5240.js"></script>

### 参考

- [mz box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)


