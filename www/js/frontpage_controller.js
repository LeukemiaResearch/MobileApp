angular.module('starter.controllers')

  .controller('frontpageController', ['$scope', '$location', 'questionState', 'MucositisDataService', function($scope, $location, questionState, MucositisDataService) {
  $scope.openQuestionWizardPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("questionwizardpage");
  };

  $scope.openDataOverviewPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("dataoverviewpage");
  };

  //Mucositis data
  $scope.getLatestMucositis = function (rowId){
    var tmp = "";
    if(MucositisDataService.getLatestMucositisRegistration() === undefined){
      tmp = "No data"
    }
    else{
      if(rowId===1){
        tmp = MucositisDataService.getLatestMucositisPain();
      }
      else if(rowId===2){
        tmp = MucositisDataService.getLatestUlcers();
      }
      else if(rowId===3){
        tmp = MucositisDataService.getLatestFoodIntake();
      }
    }
    return tmp;
  };

}]);
