var deskNewsApp = angular.module('deskNewsApp', ['ngAnimate']);
var gui = require('nw.gui'); // for node-webkit use

deskNewsApp.controller('weatherCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	var citySpecified = false; // if the city is manually specified
	
	updateWeather();
	
	// update the weather periodically - every 15 mins
	$interval(updateWeather, 900000);
	/**
	 * Gets the city and update that city's weather
	 */
	function updateWeather() {
		var cityName = 'Vancouver';
		if (citySpecified) {
			// just set the value of cityName
			// cityName = "something";
			getWeather(cityName);
		} else {
			// query for the current geolocation
			$http.get('http://ip-api.com/json').success(function(data){
				if (data.status === "success") {
					cityName = data.city;
					getWeather(cityName);
				} else {
					// not able to get the geolocation
					console.log("Error: Not able to get the geolocation");
				}
			});
		}
		console.log('Weather is updated !');
	}
	/**
	 * Updates the weather based on the name of the city
	 */
	function getWeather(cityName) {
		$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName)
			.success(function(data) {
				$scope.weather = data;
			});
	}
}]);

deskNewsApp.controller('dateCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	var interval = 3600000; // update the date every 1 hour by default
	getDate();
	/**
	 * Updates the date based on the given interval
	 */
	function getDate() {
		var date = new Date();
		if (date.getHours() === 23) {
			interval = 1000;
		} else {
			interval = 3600000;
		}
		$scope.dateStr = date.toDateString();
		console.log('Date is updated!');
		$timeout(getDate, interval);
	}
}]);

deskNewsApp.controller('currencyCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	var lastCNY = -1;
	var lastUSD = -1;
	updateRate();
	$interval(updateRate, 60000);
	/**
	 * Updates the currency rate
	 */
	function updateRate() {
		$http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20' 
					+ '(%22CADCNY%22,%22CADUSD%22)&env=store://datatables.org/alltableswithkeys&format=json')
			.success(function(data) {
				$scope.toCNY = Number(data.query.results.rate[0].Rate);
				$scope.toUSD = Number(data.query.results.rate[1].Rate);
				// decide the icon 'up' or 'down'
				if (lastCNY === -1) {
					lastCNY = $scope.toCNY;
				} else {
					if ($scope.toCNY > lastCNY) {
						$scope.CNY_arrow = 'img/arrow-up-s.png';
					} else if ($scope.toCNY < lastCNY) {
						$scope.CNY_arrow = 'img/arrow-down-s.png';
					} else {
						$scope.CNY_arrow = '';
					}
				}
				if (lastUSD === -1) {
					lastUSD = $scope.toUSD;
				} else {
					if ($scope.toUSD > lastUSD) {
						$scope.USD_arrow = 'img/arrow-up-s.png';
					} else if ($scope.toUSD < lastUSD) {
						$scope.USD_arrow = 'img/arrow-down-s.png';
					} else {
						$scope.USD_arrow = '';
					}
				}
			});
		console.log('Currency Rate is updated !');
	}
}]);

deskNewsApp.controller('topNewsCtrl', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout) {
	var topNews = [];
	$scope.newsList = [];
	var currentIndex = 0;
	var promise = null;
	
	updateNews();
	
	// update the news every 15 mins
	$interval(updateNews, 900000);
	
	function updateNews() {
		$http.get('https://www.bing.com/news?FORM=Z9LH3&format=RSS&mkt=en-CA')
		.success(function(data) {
			var jsonObj = new X2JS().xml_str2json(data);
			topNews = jsonObj.rss.channel.item;
			// setup the animation
			/*$('.newsTitle').textillate({
				  selector: '.titles',
				  loop: true,
				  minDisplayTime: 3800,
				  autoStart: true,
				  // in animation settings
				  'in': {
				    // set the effect name
				    effect: 'fadeInUp',
				    // set to true to animate all the characters at the same time
				    sync: true
				  },

				  // out animation settings.
				  out: {
				    effect: 'fadeOutUp',
				    sync: true
				  }
				});*/
			console.log('News Updated !');
			if (promise) {
				$interval.cancel(promise);
			} else {
				loopList();
			}
			promise = $interval(loopList, 7000);
		});
	}
	
	function loopList() {
		$scope.newsList.shift();
		$scope.newsList.push(topNews[currentIndex % 20]);
		currentIndex++;
	}
	
	$scope.openLink = function(link) {
		gui.Shell.openExternal(link);
	};
}]);