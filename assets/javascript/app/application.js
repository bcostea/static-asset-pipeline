define('application', ['jquery', 'bootstrap', 'notify'],
       function($){ 
         return function(){
           $('.bottom-left').notify({
             message: { text: 'I\'ve been loaded!' },
             type: 'bangTidy',
             fadeOut: {
               delay: Math.floor(Math.random() * 500) + 2500
             }
           }).show();
         }
       }
      );

require(['application', 'jquery'], function(app, $){
        app();
      });

