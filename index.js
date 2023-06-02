/* global hexo */

'use strict';

const assign = require('object-assign');
const generator = require('./lib/generator');

hexo.config.exindex_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.exindex_generator);

hexo.extend.generator.register('exindex_generator', function(locals) {
  const enableConf = hexo.config.exindex_generator_enable;
  const isEnable = typeof enableConf === 'undefined' ? true : enableConf;
  if (isEnable) {
    // console.info('Hello hexo-generator-exindex!');
    return generator.call(this, locals);
  }
  return locals;
});
