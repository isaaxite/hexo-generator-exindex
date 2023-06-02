/* global hexo */

'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  let posts = locals.posts;

  if (config.exindex_generator.exclude) {
    posts.data = excludePosts(posts.data, config.exindex_generator.exclude);
  }

  posts.data = sortPosts(locals.posts.data);

  if (config.exindex_generator.lowest) {
    posts.data = lowestPosts(posts.data, config.exindex_generator.lowest);
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
    if(a.top && b.top) { 
      if(a.top == b.top) return b.date - a.date; 
      else return b.top - a.top; 
    }
    else if(a.top && !b.top) {
      return -1;
    }
    else if(!a.top && b.top) {
      return 1;
    }
    else return b.date - a.date;
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

function lowestPosts(postsData, lowestConf) {
  const lowest = lowestConf || {};
  const lowestTags = (lowest.tags || '').split(',');

  const newPostsData = [];
  const lowestData = [];
  for (const it of postsData) {
    const carTags = it.tags.data.map(it => it.name);
    const isLowest = lowestTags.some(it => carTags.includes(it));

    if (isLowest) {
      console.info(it.title)
      lowestData.push(it);
      continue;
    }

    newPostsData.push(it);
  }

  newPostsData.push(...lowestData);
  lowestData.length = 0;

  return newPostsData;
}
