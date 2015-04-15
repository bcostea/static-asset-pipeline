requirejs.config({
  baseUrl: './js',
  paths: {
    'almond':           'lib/almond',
    'jquery':           'lib/jquery',
    'bootstrap':        'lib/bootstrap',
    'flippant':         'lib/flippant',
    'carousel':         'lib/bootstrap-modal-carousel',
    'notify':           'lib/bootstrap-notify',
    'application':      'app/application'
  },
  shim: {
    'bootstrap':        ['jquery'],
    'flippant':         ['bootstrap', 'jquery'],
    'carousel':         { deps: ['jquery'], exports: '$.fn.carousel' },
    'notify':           { deps: ['jquery'], exports: '$.fn.media' },
    'application':      ['jquery', 'bootstrap','notify']
  }
});

require(['application']);
