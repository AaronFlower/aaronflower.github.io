---
layout: post
title:  H5 History API
date: 2018-01-13 
categories: Essays
tag: javascript, history
---

使用 H5 History API 可以帮助我们更好的操作浏览器历史记录，尤其在 SPA 中。更进一步，可以帮我们减少带宽(bandwith)。

{:.af-sectionDivider}
### [Can I Use](https://caniuse.com/#search=history)

现代浏览器都支持.

{:.af-sectionDivider}
### [History 提供的接口](https://html.spec.whatwg.org/multipage/history.html#the-history-interface)

```java
enum ScrollRestoration { "auto", "manual" };

[Exposed=Window]
interface History {
  readonly attribute unsigned long index;
  readonly attribute unsigned long length;
  attribute ScrollRestoration scrollRestoration;
  readonly attribute any state;
  void go(optional long delta = 0);
  void back();
  void forward();
  void pushState(any data, DOMString title, optional USVString? url = null);
  void replaceState(any data, DOMString title, optional USVString? url = null);
};
```

#### For web developers (non-normative, 非标准)

- window.history.index

  返回当前入口在会话历史记录的 index. 测试了下，主流浏览器都没有实现该属性。

- window.history.length

  当前会话历史记录的总数。

- window.history.scrollRestoration[=value]

  当前会话历史记录的的 scroll 模式，指定在来回遍历历史记录时是否恢复滚动条到指定位置。

- window.history.state

  当前序列化的记录状态。

- window.history.back()

  在历史记录中，回退一步。如果没有上一个页面，则什么也不做。

- window.history.forward()

  在历史记录中，向前一步。如是没有下一个页面，则什么也不做。

- window.history.go([delta])

  `back,forward` 方法只能回退或前进一步，而 go 方法支持指定 delta 步长。正数向前，负数后退，为 0 则重新加载当前页面。 默认 delat = 0, 即重新加载当前页面，即执行 `location.reload()`。

- window.history.pushState(data, title, [, url])

  向会话历史中添加一条历史记录，并且把**最新的 push 的这条记录更新为当前记录**。

  **注意**，如果当前页面在历史记录中不是最后一条，那么会先把当前之后的记录全部删除掉然后再追加一条新的记录。

- window.history.replaceState(data, title, [, url])

  替换会话历史中的当前项的 state 对象，title 以及可以更新当前页面在 history 中的 url。仅仅是替换而已。

`pushState，replaceState`只是操作历史记录的变更，并不会去做导航，如果提供了第三个参数 URL,  那么会更新 URL, 但是绝对不会触发 `hashchange`事件。

{:.af-sectionDivider}
### popstate 事件

每当当前历史记录项发生变化时，就会触发 window 的 `popstate`事件。如果当前历史记录项是由 `pushState,replaceState`改变的，则该事件的 `state` 会包含当前历史记录状态的对象拷贝。

调用`history.pushState()`或者`history.replaceState()`不会触发popstate事件. `popstate`事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用`history.back()、history.forward()、history.go()`方法).

当网页加载时,各浏览器对`popstate`事件是否触发有不同的表现,Chrome 和 Safari会触发`popstate`事件, 而Firefox不会.

{:.af-sectionDivider}
### By The Way

Vue 的路由插件 vue-router ，实现了 `router.push`、 `router.replace` 和 `router.go` 其表现和 [`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)保持一致， 所以在基于 Vue 的 Spa 中，我们可以像操作 router 的 push, replace, go 方法一样来实现 window 的 history 表现功能。