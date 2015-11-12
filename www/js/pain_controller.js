angular.module('starter.controllers')

  .controller('painController', function ($scope, questionState) {

    $scope.show = true;

    //Expose questionState
    $scope.questionState = questionState;

    //values
    questionState.painType;
    questionState.painScore;
    questionState.morphine;
    questionState.morphineType;
    questionState.morphineDose;

    //Initialize group values and classes
    if (questionState.flaccvalue === undefined)
      questionState.flaccvalue = [undefined, undefined, undefined];

    questionState.score = 0;

    //Change selection
    $scope.select = function (flaccnumber, newvalue) {
      if (questionState.flaccvalue[flaccnumber] !== undefined)
      {
        questionState.score -= questionState.flaccvalue[flaccnumber];
      }
      questionState.flaccvalue[flaccnumber] = newvalue;
      questionState.score += newvalue;
    };

    //Initialize
    if (questionState.morphineMeasureUnit === undefined)
      questionState.morphineMeasureUnit = 'mg';

    //pain type selection
    $scope.selectPainType = function (painType) {
      questionState.painType = painType;
    }

    $scope.smileys = [
      {id: 0, src: "img/smiley0.png"},
      {id: 1, src: "img/smiley2.png"},
      {id: 2, src: "img/smiley4.png"}
    ];

  })
