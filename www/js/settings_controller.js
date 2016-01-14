angular.module('starter.controllers')

  .controller('settingsController', ['$scope', '$ionicModal', function($scope, $ionicModal, $timeout) {

    //TODO: CREATE FACTORY FOR MODULES
    $scope.modules = {
      medicine: true,
      bloodsample: true,
      pain: true,
      mucositis: true
    };

    $ionicModal.fromTemplateUrl("templates/settings.html", {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

  }]);
