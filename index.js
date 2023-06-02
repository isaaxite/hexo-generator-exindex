/* global hexo */

'use strict';

const assign = require('object-assign');
const generator = require('./lib/generator');

hexo.config.exindex_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.exindex_generator);

hexo.extend.generator.register('exindex_generator', function(locals) {
  const ret = generator.call(this, locals);
  return ret;
});
