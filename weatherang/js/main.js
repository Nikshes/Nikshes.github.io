var app = angular.module("myApp", []);

app.controller("mainCtrl", function ($scope, $http){
	
	$scope.clickSearch = function(){
		var searchValue = document.getElementById('autocomplete').value;
		weatherReq(searchValue, $http,$scope)
	}
	angular.element(document).ready(function () {
        cityFind()
        var searchValue = "Moscow, Russia"
		weatherReq(searchValue, $http,$scope)
    });
})

function weatherReq (searchValue, $http, $scope){
	$http({
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather?q='+searchValue+'&APPID=fdc9932c1f79cd56ea573b23f2b47010&units=metric'
  	}).then(function successCallback(response) {
  		return showWeather($scope, response)
 	 }, function errorCallback(response) {
  });
}

function showWeather ($scope ,response){
	var strDesc=response.data.weather[0].description
  	$scope.cityName= response.data.name +", "+ response.data.sys.country
  	$scope.weather=(strDesc).charAt(0).toUpperCase()+strDesc.slice(1)
  	$scope.temp=response.data.main.temp+' C'
  	$scope.wind=response.data.wind.speed+" meter/sec"
  	$scope.pressure=response.data.main.pressure+" hpa"
  	$scope.humidity=response.data.main.humidity+" %"
  	$scope.cloudiness=response.data.clouds.all+" %"
  	return
}

function cityFind (){
	var options = {
	  types: ['(cities)']
	 };
	var input = document.getElementById('autocomplete');
	var autocomplete = new google.maps.places.Autocomplete(input,options);
}