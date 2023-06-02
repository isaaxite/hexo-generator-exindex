# hexo-generator-exindex

[![license](https://img.shields.io/bower/l/MI)](https://github.com/isaaxite/hexo-generator-exindex/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/hexo-generator-exindex)](https://www.npmjs.com/package/hexo-generator-exindex)
![version](https://img.shields.io/github/package-json/v/isaaxite/hexo-generator-exindex)
![languages-count](https://img.shields.io/github/languages/count/isaaxite/hexo-generator-exindex)
![code-size](https://img.shields.io/github/languages/code-size/isaaxite/hexo-generator-exindex)
![last-commit](https://img.shields.io/github/last-commit/isaaxite/hexo-generator-exindex)
![](https://img.shields.io/node/v/hexo-generator-exindex)


Extenp hexo-generator-index to provide topping and hiding specified articles on the homepage through specified tags.

# Feature

- Pin-top
- Hide specified articles

## Pin-top

You can pin-top a article by setting the tag of front-matter.That's acticle will display in your homepage's list topest.

```yml
---
title: How Diff-Algorithm work in VUE
date: 2019-12-26 08:41:47
tags:
- vue
top: true
---
```

## Hide specified articles

You can hide a specified articles by hexo-tag in front-matter and config hidding tag in root `_config.yml`.


First, config `_config.yml` like that:

```yml
# the custom index2 generator, can be array or object
exindex_generator:
  exclude:
    - tag hidden # exclude article which tag is Hexo
```

Then, set a `hidden` tag

```yml
---
title: C1科目二
tags:
  - C1驾驶证
  - hidden
categories:
  - C1科目二
date: 2023-04-11 18:19:51
---
```

Finally, you will find that this article has disappeared from your homepage.

# Options

Add or modify the following section to your root _config.yml file

```yml
exindex_generator_enable: true
exindex_generator:
  path: ''
  per_page: 10
  order_by: -date
  pin_top:
    tags: topping
  pin_bottom:
    tags: bottoming # exclude article which tag is Hexo, exp tags: <tag1>[,<tag2>,...]
```

- **exindex_generator_enable**: on or off this plugins.
- **path**: Root path for your blog's index page. 
  - default: ""
- **per_page**: Posts displayed per page.
  - default: [`config.per_page`](https://hexo.io/docs/configuration.html#Pagination) as specified in the official Hexo docs (if present), otherwise `10`
  - `0` disables pagination
- **order_by**: Posts order. 
  - default: date descending
- **pagination_dir**: URL format.
  - default: 'page'
  - `awesome-page` makes the URL ends with 'awesome-page/<page number>' for second page and beyond.
- **pin_top**: Bring the article to the top.
  - default: ""
  - `tags`: `<tag1>[,<tag2>,...]`, you need to set these tags at fron-matter!
- **pin_bottom**: Bring the article to the bottom.
  - default: ""
  - `tags`: `<tag1>[,<tag2>,...]`
- **exclude**: Hide corresponding articles through tags.
  - default: ""
  - `tags`: `<tag1>[,<tag2>,...]`

# License

[MIT](https://github.com/isaaxite/hexo-generator-exindex/blob/main/LICENSE) @ isaaxite