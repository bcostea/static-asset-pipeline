requirejs.config({  
  baseUrl: './js',
  paths: {
      'almond': 'lib/almond',
      'jquery': 'lib/jquery',
      'bootstrap': 'lib/bootstrap'
    },
  shim: {
      'bootstrap': ['jquery']
    }
});

require([
  'app/application',
]);
