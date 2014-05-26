var app = angular.module('guideApp',[]);

app.config( ['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'guideController',
            templateUrl: 'guides.html.erb'
        })
        .otherwise({redirectTo: '/'});
 }]);

app.controller('guideController', function($scope){
	$scope.areas = [
			{ 
				name: "All"
			}	
			,{ 
				name: "Chinatown"
			}	
			,{ 
				name: "Downtown"
			}
			,{
				name: "East Vancouver"
			}
			,{
				name: "Fairview"
			}	
			,{
				name: "Gastown"
			}
			,{
				name: "Kitsilano"
			}
			,{
				name: "Mount Pleasant"
			
	}];
			
	$scope.showContent = function(s){
		$scope.selection = s.name;
	};

});