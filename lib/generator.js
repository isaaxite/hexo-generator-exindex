/* global hexo */

'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  let posts = locals.posts;

  posts.data = sortPosts(locals.posts.data);


  if (config.exindex_generator.exclude) {
    posts.data = excludePosts(posts.data, config.exindex_generator.exclude);
  }

  if (
    config.exindex_generator.pin_top
    || config.exindex_generator.pin_bottom
  ) {
    posts.data = pinPosts(posts.data, config.exindex_generator.pin_top, config.exindex_generator.pin_bottom);
    // console.log(posts.data.map(it => it.title))
  }

  const paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.exindex_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
}


function sortPosts(postsData) {
  return postsData.sort(function(a, b) {
    return b.date - a.date;
  });
}

function excludePosts(postsData, excludeConf) {
  const exclude = excludeConf || {};
  const excludeTags = (exclude.tags || '').split(',');

  return postsData.filter(function(it) {
    const carTags = it.tags.data.map(it => it.name);
    const isExclude = excludeTags.some(it => carTags.includes(it));

    return !isExclude;
  });
}

function pinPosts(postsData, pinTopConf, pinBottomConf) {
  const pinTop = pinTopConf || {};
  const pinBottom = pinBottomConf || {};
  const pinTopTags = formatTags(pinTop.tags);
  const pinBottomTags = formatTags(pinBottom.tags);

  let newPostsData = [];
  const pinTopData = [];
  const pinBottomData = [];
  for (const it of postsData) {
    const carTags = formatTags(it.tags.data.map(it => it.name));
    const isPinTop = pinTopTags.some(it => carTags.includes(it));
    const isPinBottom = pinBottomTags.some(it => carTags.includes(it));

    // console.info(it.title, isPinTop, isPinBottom, carTags, pinBottomTags)

    if (isPinBottom) {
      pinBottomData.push(it);
      continue;
    }

    if (isPinTop) {
      pinTopData.push(it);
      continue;
    }

    newPostsData.push(it);
  }

  newPostsData = [...pinTopData, ...newPostsData, ...pinBottomData];
  pinTopData.length = 0;
  pinBottomData.length = 0;

  return newPostsData;
}

function formatTags(data = []) {
  let arr = data;
  if (typeof data === 'string') {
    arr = (data || '').split(',');
  }

  return arr.map(it => it.toLowerCase());
}
