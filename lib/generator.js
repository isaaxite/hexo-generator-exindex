/* global hexo */

'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  let posts = locals.posts;
  let exclude = hexo.config.exindex_generator.exclude || {};
  const excludeTags = (exclude.tags || '').split(',');

  posts.data = posts.data.filter(function(it) {
    const carTags = it.tags.data.map(it => it.name);
    const isExclude = excludeTags.some(it => carTags.includes(it));

    return !isExclude;
  }); 

  posts.data = posts.data.sort(function(a, b) {
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

  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.exindex_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
}
