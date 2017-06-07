// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('botton');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('sin', {
    url: '/sin',
    abstract: true,
    templateUrl: 'templates/sin.html',
    controller: 'AppCtrl'
  })

  .state('app.cidades', {
    url: '/cidades',
    views: {
      'menuContent': {
        templateUrl: 'templates/cidades.html',
        controller: 'CidadesCtrl'
      }
    }
  })

  .state('sin.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'CidadesCtrl'
      }
    }
  })

  .state('sin.bv', {
    url: '/boas-vindas',
    views: {
      'menuContent': {
        templateUrl: 'templates/boas-vindas.html',
        controller: 'CidadesCtrl'
      }
    }
  })

  .state('sin.root', {
    url: '/principal',
    views: {
      'menuContent': {
        templateUrl: 'templates/principal.html',
        controller: 'CidadesCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/cidades/:cidadeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cidade.html',
        controller: 'CidadeCtrl'
      }
    }
  })

  .state('app.cad-cidade', {
    url: '/cadastrar-cidade',
    views: {
      'menuContent': {
        templateUrl: 'templates/cad-cidade.html',
        controller: 'CidadesCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sin/boas-vindas');
});
