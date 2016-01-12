angular.module('starter.controllers')

  .controller('bloodsampleController', function($scope, questionState, BloodsampleDataService) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.Leukocytter = undefined;
    questionState.Neutrofile = undefined;
    questionState.Thombocytter = undefined;
    questionState.Hemoglobin = undefined;
    questionState.Alat = undefined;
    questionState.CRP = undefined;

    BloodsampleDataService.finishedWizard = function() {
      var timeStamp = new Date(questionState.timeStamp.getTime());
      //need to set 1 millisecond because calendar date overflows when checking for valid front page data
      //caused by latestDate.setHours(24); in getLatestRegistration methods to get data inclusive for the day
      timeStamp.setHours(0,0,0,1);

      BloodsampleDataService.createBloodsampleData(timeStamp, questionState.Leukocytter, questionState.Neutrofile, questionState.Thombocytter, questionState.Hemoglobin, questionState.Alat, questionState.CRP);
    };
  });
