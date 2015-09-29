angular.module('starter.controllers', ['mgo-angular-wizard'])

  .controller('questionsController', ['$scope', 'questionState', function($scope, questionState ) {
    $scope.questions = {
      "Blodprøve": {
        "Blodprøve": "templates/questions/blodsample.html"
      },
      "Smerte": {
        "Morfin":"templates/questions/morphine.html",
        "Type":"templates/questions/painposition.html",
        "Intensitet": "templates/questions/painscale.html"
      },
      "Mucositis": {
        "Mundsår":"templates/questions/mucositistype.html",
        "Kvalme":"templates/questions/nausea.html"
      }
    };
    $scope.data = questionState.data;
    $scope.type = questionState.data.type;
    $scope.template = "fff";
    $scope.hideIndicators = Object.keys($scope.questions[$scope.type]).length<=1;
  }])

  .controller('frontpageController', ['$scope', '$location', 'questionState', function($scope, $location, questionState) {
    $scope.openQuestionWizardPage = function(type){
      questionState.data.type = typeof(type)=="string"?type:undefined;
      $location.path("questionwizardpage");
    };
  }])

  .factory('questionState', function($timeout) {
    var obj = {
      type: undefined, //e.g. pain for pain questions
    };
    return {data: obj};
  });

