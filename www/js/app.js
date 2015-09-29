// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter',
  ['ionic', 'starter.controllers', 'starter.services', 'flexcalendar' , 'pascalprecht.translate'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      JANUARY: 'January',
      FEBRUARY: 'February',
      MARCH: 'March',
      APRIL: 'April',
      MAI: 'May',
      JUNE: 'June',
      JULY: 'July',
      AUGUST: 'August',
      SEPTEMBER: 'September',
      OCTOBER: 'October',
      NOVEMBER: 'November',
      DECEMBER: 'December',

      SUNDAY: 'Sunday',
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thurday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday'
    });
    $translateProvider.translations('fr', {
      JANUARY: 'Janvier',
      FEBRUARY: 'Févier',
      MARCH: 'Mars',
      APRIL: 'Avril',
      MAI: 'Mai',
      JUNE: 'Juin',
      JULY: 'Juillet',
      AUGUST: 'Août',
      SEPTEMBER: 'Septembre',
      OCTOBER: 'Octobre',
      NOVEMBER: 'Novembre',
      DECEMBER: 'Décembre',

      SUNDAY: 'Dimanche',
      MONDAY: 'Lundi',
      TUESDAY: 'Mardi',
      WEDNESDAY: 'Mercredi',
      THURSDAY: 'Jeudi',
      FRIDAY: 'Vendredi',
      SATURDAY: 'Samedi'
    });
    $translateProvider.translations('pt', {
      JANUARY: 'Janeiro',
      FEBRUARY: 'Fevereiro',
      MARCH: 'Março',
      APRIL: 'Abril',
      MAI: 'Maio',
      JUNE: 'Junho',
      JULY: 'Julho',
      AUGUST: 'Agosto',
      SEPTEMBER: 'Setembro',
      OCTOBER: 'Outubro',
      NOVEMBER: 'Novembro',
      DECEMBER: 'Dezembro',

      SUNDAY: 'Domingo',
      MONDAY: 'Segunda',
      TUESDAY: 'Terça',
      WEDNESDAY: 'Quarta',
      THURSDAY: 'Quinta',
      FRIDAY: 'Sexta',
      SATURDAY: 'Sábado'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  })
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup frontpage
      .state('frontpage', {
        url: '/frontpage',
        templateUrl: 'templates/frontpage.html'
      })

      // setup frontpage
      .state('questionwizardpage', {
        url: '/questionwizardpage',
        templateUrl: 'templates/questionwizard.html'
      })

      // setup frontpage
      .state('dataoverviewpage', {
        url: '/dataoverviewpage',
        templateUrl: 'templates/dataoverview.html'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/frontpage');

  })

  .directive('frontpagebutton', function() {
    return {
      templateUrl: 'my-customer.html'
    };
  });

