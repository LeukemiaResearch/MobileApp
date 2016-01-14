angular.module('starter.controllers')

  .controller('frontpageController', ['$scope', '$location', 'questionState', 'MucositisDataService', 'MedicineDataService', 'BloodsampleDataService','PainDataService', function($scope, $location, questionState, MucositisDataService, MedicineDataService, BloodsampleDataService, PainDataService) {
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

    //Pain card data
    $scope.getLatestPainRegistration = function (rowId){
      var tmp = "";
      if(PainDataService.getLatestPainRegistration() === undefined && rowId != 4){
        if (rowId == 1) tmp = "-";
        else tmp = "Ingen data";
      }
      else{
        if(rowId===1){
          tmp = PainDataService.getLatestPainType();
          //Capitalize first letter
          tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
        }
        else if(rowId===2){
          tmp = PainDataService.getLatestPainScore();
        }
        else if (rowId===3) {
          var morphineAmount = PainDataService.getLatestMorphineAmount();
          if (morphineAmount === undefined || morphineAmount == 0) {
            tmp = "Ingen morfin"
          } else {
            tmp = morphineAmount;
          }
        }
        else if (rowId === 4) {
          var morphineMU = PainDataService.getLatestMorphineMeasureUnit();
          if (morphineMU !== undefined && morphineMU != false ) {
            tmp = morphineMU;
          }
        }
      }
      return tmp;
    };

}]);
