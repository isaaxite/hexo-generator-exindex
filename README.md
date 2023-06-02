# hexo-generator-exindex

Extenp hexo-generator-index to provide topping and hiding specified articles on the homepage through specified tags.

# Feature

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
```


# License

[MIT](https://github.com/isaaxite/hexo-generator-exindex/blob/main/LICENSE) @ isaaxite