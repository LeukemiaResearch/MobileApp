angular.module('starter.controllers')

  .controller('frontpageController', ['$scope', '$location', 'questionState', 'MucositisDataService', 'MedicineDataService', 'BloodsampleDataService', function($scope, $location, questionState, MucositisDataService, MedicineDataService, BloodsampleDataService) {
  $scope.openQuestionWizardPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("questionwizardpage");
  };

  $scope.openDataOverviewPage = function(type){
    questionState.type = typeof(type)=="string"?type:undefined;
    $location.path("dataoverviewpage");
  };

  //Medicine card data
  $scope.getLatestMedicineRegistration = function (rowId){
    var tmp = "";
    if(MedicineDataService.getLatestMedicineRegistration() === undefined){
      tmp = "0.0"
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

  //Bloodsample card data
  $scope.getLatestBloodsampleRegistration = function(rowId){
    var tmp = undefined;
    if(BloodsampleDataService.getLatestBloodsampleRegistration() === undefined){
      tmp = "0.0"
    }
    else{
      if(rowId===1){
        tmp = BloodsampleDataService.getLatestThrombocytes();
      }
      else if(rowId===2){
        tmp = BloodsampleDataService.getLatestHemoglobin();
      }
      else if(rowId===3){
        tmp = BloodsampleDataService.getLatestAlat();
      }
    }
    return tmp;
  };

  //Mucositis card data
  $scope.getLatestMucositisRegistration = function (rowId){
    var tmp = undefined;
    if(MucositisDataService.getLatestMucositisRegistration() === undefined){
      tmp = "Ingen data"
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
