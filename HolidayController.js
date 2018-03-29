MyApp.controller("HolidayController", ['$scope', '$http', '$location',
    function ($scope, $http, $route,$location) {
	
	$scope.HolidayList=HolidayAPI("2dbee6df-3f4b-4bbb-8969-bb7df61cfd0d");

    }
]);