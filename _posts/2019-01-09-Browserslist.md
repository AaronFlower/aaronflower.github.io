---
layout: post
title: Browserslist 为你中意的浏览器写代码
categories: essay
tag: js, css, 
---


![img](https://pbs.twimg.com/profile_banners/874631111854501888/1497572903/1500x500)


{:.af-sectionDivider}
> tl;dr 
>
> Browserslist 是一个前端项目配置工具，功能是在前端工具之间共享目标环境的浏览器信息。
>
> [Browserslist](https://github.com/ai/browserslist) is a config to share target browsers between different front-end tools.

{:.af-sectionDivider}
在现代前端项目中，我们会使用 Babel 来转换 ES6 语法、使用 AutoPrefixer, PostCSS 来转换 CSSNext 语法、使用 ESLint 来保证代码质量和规范。所以一般在前端项目中会使用下面常用的工具：

- **[Autoprefixer](https://github.com/postcss/autoprefixer)**
- **[Babel](https://babeljs.io/)**
- **[postcss-preset-env](https://github.com/csstools/postcss-preset-env)**
- **[postcss-normalize](https://github.com/csstools/postcss-normalize)**
- **ESLint 的 [eslint-plugin-compat](https://github.com/eslint/eslint)**
- **Stylelint 的 [stylelint-no-unsupported-browser-features](https://github.com/ismay/stylelint-no-unsupported-browser-features)**

这些工具会根据配置的目标浏览器环境来决定使用那些策略来处理你的源代码。

 例如，如果你仅支持 Edge 15, 那么 Babel 不会对 `` const str = `hello world` ``进行转换，但是如果要支持 IE 10 那么 Babel 就会把其转换成 `var str = "hello world";`。

```json
"babel": {
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["Edge 15"]
        }
      }
    ]
  ]
}
```



Babel 在转换时会根据目标浏览器信息加入特殊的 Plugins 或 Polyfills，同样 **[Autoprefixer](https://github.com/postcss/autoprefixer)** ，**[postcss-preset-env](https://github.com/csstools/postcss-preset-env)** ，**[postcss-normalize](https://github.com/csstools/postcss-normalize)** ，**ESLint 的 [eslint-plugin-compat](https://github.com/eslint/eslint)** ，**Stylelint 的 [stylelint-no-unsupported-browser-features ](https://github.com/ismay/stylelint-no-unsupported-browser-features)**  工具也提供同样的配置。

但所有这样工具都有自己的配置信息，这样很可能会导致工具之间读取的配置信息是不一致的。

{:.af-sectionDivider}
### Browserslist 是一个好注意

[Browserslist](https://github.com/ai/browserslist) 的出现就是为了解决工具之间各自为战的情况，可以提供统一的配置。即共享项目中的目标浏览器环境信息。

![image-20190110114658577](/assets/imgs/2019-01-09-browserslist-query.png)

#### 使用方法

Browserslists 通过向 [caniuse](https://caniuse.com/) 传递查询字符串（queries）来获取目标环境信息，这些 queries 可写在下面两个文件中，即 Browserslists 提供两种配置方法。（其实还有其它配置方法，可参考文档）。

- `.browserslistrc` 文件

在项目中添加一个`.browserlistrc`文件来配置,  每一行都是一个 query, `#` 用来注释。

```bash
# Browsers that we support

last 1 version
> 1%
not dead
```

- 通过 `package.json` 文件

在项目中的 `package.json`文件中添加一个 `broserslist` 项也可以完成配置，每一个元素都是一个 query。

```json
{
  "private": true,
  "browserslist": [
    "last 1 version",
    "> 1%",
    "not dead"
  ],
  "scripts": {
  }
}
```

上面两种配置方法效果是一样的，那么通过上面的配置后，我们的项目的目标浏览器环境是什么那？通过 `npx browserslist`可以查看：

```bash
$ npx browserslist
and_chr 70
and_ff 63
and_qq 1.2
and_uc 11.8
android 67
baidu 7.12
chrome 71
chrome 70
chrome 69
edge 18
edge 17
firefox 64
firefox 63
ie 11
ie_mob 11
ios_saf 12.0-12.1
ios_saf 11.3-11.4
op_mini all
op_mob 46
opera 57
safari 12
```

{:.af-sectionDivider}
#### Queries

1. query 字符串不区分大小写。
2. 如果没有 query 字符串，则会使用默认的 defaults 字符串，其代表的 queries 是：`> 0.5%, last 2 versions, Firefox ESR, not dead`.

上面例子中的 queries：

```bash
"last 1 version"
"> 1%"
"not dead"
```

是什么意思那？解释如下：

- `last 1 version` : 即支持各类浏览器最近的一个版本，当然这里的 1 是可变的数字。
- `1%` : 支持市场份额大于 1% 的浏览器。
- `not dead`: 这个 query 中 `not` 是**逻辑非**操作符，即对 `dead`取反，而浏览器被认为是 `dead` 条件是：最新的两个版本中发现其市场份额已经低于 0.5% 并且 24 个月内没有任务官方支持和更新了。

*not* 也 queries 中惟一一个操作符，可以用在任何 query 前。

Browserslist 支持更完善的 queries 请参考[文档](https://github.com/browserslist/browserslist#full-list)。

#### 最佳实践

- 直接选择支持的浏览器（如：`last 2 Chrome versions`），如果你的项目仅支持某个浏览器。之前见过公司的内部系统仅支持 Chrome 浏览器，就可以使用这个 query 啦。
- 如果要 Override 默认配置，可以通过组合  `last 1 version`, `not dead` , `> 0.2%` (or `> 1% in US`, `> 1% in my stats`). 来实现。
- 不要删除你不了解的浏览器。Opera Mini 在非洲的用户超过 10 亿比 Edge 的全球市场份额还大。QQ 浏览器在中国的份额超过 Firefox 和 Safari 的总合。

#### 结论

当你使用 Browserslist 配置好支持的浏览器后，那么 Babel, PostCSS, ESLint 等工具就可以为你提供一致的服务了。

- ESLint 配置效果

![ESLint 配置效果](https://raw.githubusercontent.com/amilajack/eslint-plugin-compat/master/img/eslint-plugin-compat-demo.gif)

- StyleLint 配置效果

![img](https://css-tricks.com/wp-content/uploads/2017/05/stylelist-browserlist.png)

#### 参考

1. [Browserslist is a good idea](https://css-tricks.com/browserlist-good-idea/)

2. [Browserslist Example](https://github.com/browserslist/browserslist-example)
