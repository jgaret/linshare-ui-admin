'use strict';

angular.module('linshareUiAdmin').directive('lsFooter', [
  function() {
    return {
      restrict: 'A',
      transclude: true,
      scope: false,
      templateUrl: '/views/templates/common/footer.html',
      replace: false
    };
  }
]);
