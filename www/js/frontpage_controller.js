angular.module('starter.controllers')

  .controller('frontpageController', ['$scope', '$location', 'questionState', 'MucositisDataService', 'MedicineDataService', function($scope, $location, questionState, MucositisDataService, MedicineDataService) {
  $scope.openQuestionWizardPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("questionwizardpage");
  };

  $scope.openDataOverviewPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("dataoverviewpage");
  };

  //Medicine card data
  $scope.getLatestMedicine = function (rowId){
    var tmp = "";
    if(MedicineDataService.getLatestMedicineRegistration() === undefined){
      tmp = "0.0 mg"
    }
    else{
      if(rowId===1){
        tmp = MedicineDataService.getLatestMtx();
      }
      else if(rowId===2){
        tmp = MedicineDataService.getLatestSixMp();
      }
    }
    return tmp;
  };

  //Mucositis card data
  $scope.getLatestMucositis = function (rowId){
    var tmp = undefined;
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
