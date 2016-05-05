(function () {
  'use strict';

  angular
    .module('app')
    .directive('ttInforpage', inforPageDirective);

  function inforPageDirective() {
    // Usage: ...
    var directive = {
      restrict: 'ACE',
      transclude: false,
      templateUrl: 'javascripts/directive/information-page/information-page.html',
      scope: {
        infor: '=',
        actionSave: '&',
        actionDelete: '&',
        actionCancle: '&',
        actionSend: '&'
      },

      link: link,
      controller: inforPageController,
      controllerAs: 'vm',
    };
    return directive;

    function link(scope, element, attrs) {
      angular.element(element).bind('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }


    inforPageController.$inject = ['$scope'];

    function inforPageController($scope) {
      var vm = this;
      $scope.$watch('actionSave', function (value) {
        if (value) {
          vm.actionSave = $scope.actionSave;
        }
      });

      $scope.$watch('infor', function (value) {
        if (value) {
          vm.infor = $scope.infor;
        }
      });
      $scope.$watch('actionDelete', function (value) {
        if (value) {
          vm.actionDelete = $scope.actionSave;
        }
      });
      $scope.$watch('actionCancel', function (value) {
        if (value) {
          vm.actionCancel = $scope.actionSave;
        }
      });
      $scope.$watch('actionSend', function (value) {
        if (value) {
          vm.actionCancel = $scope.actionSave;
        }
      });
    }

    function actionDisabled($scope) {
      if ($scope.infor.password == null) {
        if (!$scope.infor.username || !$scope.infor.email||!$scope.infor.firstName||!$scope.infor.lastName || !$scope.infor.phoneNumber)
          return true;
      }
      else if (!$scope.infor.username || !$scope.infor.email || !$scope.infor.password) {
        return true;
      } else
        return false;
    }
  }
})();
  