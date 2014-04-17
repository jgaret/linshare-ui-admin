'use strict';

angular.module('linshareUiAdmin').directive('lsSidebar', [
  function() {
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      controller: ['$scope', '$log', 'Authentication', 'Tab',
        function($scope, $log, Authentication, Tab) {
          Authentication.getCurrentUser().then(function successCallback(user) {
            $scope.tabs = Tab.getAvailableTabs(user);
          });
        }
      ],
      templateUrl: '/views/templates/common/sidebar.html',
      replace: false
    };
  }
]);
