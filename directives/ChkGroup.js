/**
 * Created by Alwyn Wymeersch on 25/02/14.
 * @alwynW
 * flamesproductions.com
 */
demoApp.directive('chkgroup', [function() {
    return {
        restrict: 'E',
        scope: {
            'selectedValue': '=',   // String with comma seperated values
            'options': '=',         // Array of objects
            'idField':'@',          // Name of the id parameter (value of checkbox)
            labelField: '@'         // Name of the label parameter (value of label)
        },
        link: function($scope, element, attrs, controller) {
            if( typeof $scope.selectedValue === 'string' )
                $scope.internalChecked = $scope.selectedValue.split(',');
            else if( typeof $scope.selectedValue === 'array' )
                $scope.internalChecked = $scope.selectedValue;
            else // EVERYTHING ELSE
                $scope.internalChecked = [];

            $scope.checkSelected = function() {
                var output = [];

                var chks = element.find('input');
                angular.forEach(chks, function(elem2, key){
                    if (elem2.checked)
                        output.push(elem2.value);
                });
                $scope.$apply(function(){
                    $scope.selectedValue = output.join(',');
                });
             }
            element.on('change', $scope.checkSelected);
            $scope.checkChecked = function() {
                return $scope.internalChecked.indexOf(''+this.option[$scope.idField]) > -1;
            }
        },
        template: '<div class="checkbox" ng-repeat="option in options track by $index">' +
            '<label>' +
            '<input type="checkbox" ' +
            'value="{{option[idField]}}" ' +
            'ng-checked="checkChecked()">' +
            '{{option[labelField]}}' +
            '</label>' +
            '</div>'
    }
}]);