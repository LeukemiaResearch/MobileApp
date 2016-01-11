angular.module('starter.controllers')

  .controller('painController', function ($scope, PainDataService, questionState) {

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.painType;
    /*questionState.painScore;
    questionState.morphine;
    questionState.morphineType;
    questionState.morphineDose;*/

    //Initialize group values and classes
    if (questionState.flaccvalue === undefined)
      questionState.flaccvalue = [undefined, undefined, undefined];

    if (questionState.morphineMeasureUnit === undefined)
      questionState.morphineMeasureUnit = 'mg/t';

    questionState.painScore = 0;

    //used for switching between pain scales
    $scope.show = true;

    //morphine dose

    //pain type selection
    $scope.selectPainType = function (painType) {
      questionState.painType = painType;
    };

    //flacc selection
    $scope.selectFlacc = function (flaccnumber, newvalue) {
      if (questionState.flaccvalue[flaccnumber] !== undefined) {
        questionState.painScore -= questionState.flaccvalue[flaccnumber];
      }
      questionState.flaccvalue[flaccnumber] = newvalue;
      questionState.painScore += newvalue;
    };

    //smiley selection
    questionState.selectedSmiley = undefined;
    questionState.smileyDescription = "";

    $scope.selectSmiley = function (smileynumber) {
      questionState.selectedSmiley = smileynumber;
      questionState.painScore = smileynumber;
      switch (smileynumber) {
        case 0:
          questionState.smileyDescription = "Man kan gøre fuldstændig, som man plejer uden at tænke på, at det gør ondt.";
          break;
        case 2:
          questionState.smileyDescription = "Man kan gøre, som man plejer, men af og til må man standse op, fordi det gør ondt.";
          break;
        case 4:
          questionState.smileyDescription = "Man har mest lyst til at sidde stille og få læst en historie eller se fjernsyn, fordi det gør ondt.";
          break;
        case 6:
          questionState.smileyDescription = "Man tænker på, at det gør ondt hele tiden.";
          break;
        case 8:
          questionState.smileyDescription = "Man har så ondt, at man har lyst til at græde, fordi det gør ondt.";
          break;
        case 10:
          questionState.smileyDescription = "Man har så ondt, at man slet ikke kan holde det ud."
          break;
        default:
          questionState.smileyDescription = "";
      }
    };

    $scope.changeScale = function () {
      $scope.show = !$scope.show;
      questionState.painScore = 0;
      questionState.selectedSmiley = undefined;
      questionState.flaccvalue = [undefined, undefined, undefined];
      questionState.smileyDescription = "";
    }

    //Save Data
    PainDataService.finishedWizard = function () {
      if (questionState.morphineType === undefined) {
        questionState.morphine = false;
        questionState.morphineMeasureUnit = '';
        questionState.morphineDose = '';
        questionState.morphineType = '';
      } else questionState.morphine = true;

      if (questionState.morphineType == 'oral') {
        questionState.morphineMeasureUnit = 'mg/dag';
      }

      var data = PainDataService.createPainData(questionState.timeStamp, questionState.painType, parseInt(questionState.painScore, 10),
        questionState.morphine, questionState.morphineType, parseFloat(questionState.morphineDose), questionState.morphineMeasureUnit);
      console.log(data);
    }
  });


