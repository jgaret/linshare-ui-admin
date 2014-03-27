'use strict';

app.directive('lsFunctionalityList', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.spinner = false;
        scope.showFunctionality = function(functionality) {
          return functionality.activationPolicy.parentAllowUpdate 
                || functionality.configurationPolicy.parentAllowUpdate;
        };
        scope.style = function(functionality) {
          if (functionality.activationPolicy.status) {
            return {
              "background-color": "rgb(70, 136, 71)",
              "color": "rgb(255, 255, 255)"
            }
          } else {
            return {
              "background-color": "rgb(100, 100, 100)",
              "color": "rgb(255, 255, 255)"
            }
          }
        };
        scope.isActivated = function(functionality) {
          return functionality.activationPolicy.status;
        };
      },
      controller: ['$scope', '$filter', '$log', 'ngTableParams', 'Domain', 'Functionality',
        function($scope, $filter, $log, ngTableParams, Domain, Functionality) {
          $scope.$watch(Domain.getCurrent,
            function(newValue, oldValue) {
              if (angular.isDefined(newValue)) {
                $scope.domain = newValue;
                $scope.tableParams.reload();
              }
            },
            true
          );
          $scope.edit = function (functionality) {
            Functionality.setCurrent(functionality);
          };
          $scope.tableParams = new ngTableParams({
            page: 1,        // show first page
            count: 25,      // count per page
            sorting: {
              localizedName: 'asc',
            }
          }, {
            debugMode: false,
            total: 0, // length of data
            getData: function($defer, params) {
              Functionality.getAll($scope.domain, function(functionalities) { 
                var orderedData = params.sorting() ?
                          $filter('orderBy')(functionalities, params.orderBy()) :
                          functionalities;
                params.total(orderedData.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              });
            }
          });
        }
      ],
      templateUrl: '/views/templates/administration/functionality_list.html',
      replace: false
    };
  }
]);
