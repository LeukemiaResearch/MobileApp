angular.module('starter.controllers')

  .controller('frontpageController', ['$scope', '$location', 'questionState',
    function ($scope, $location, questionState) {
      $scope.openQuestionWizardPage = function (type) {
        questionState.type = typeof(type) == "string" ? type : undefined;
        $location.path("questionwizardpage");
      };

      $scope.openDataOverviewPage = function (type) {
        questionState.type = typeof(type) == "string" ? type : undefined;
        $location.path("dataoverviewpage");
      };


    }])
