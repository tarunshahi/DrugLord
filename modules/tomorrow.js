'use strict';

drugLord.service('tomorrowService',['cityService','playerService',function(cityServ, player) {
	var scope = this;

	scope.stayHere = function() {
		cityServ.initCities();
		player.dayCount += 1;
		player.cash -= 10;
	};

	scope.flyAway = function(cityName,price) {
		console.log(cityName,price);
		if(player.cash > price)
		{
			cityServ.flyToCity(cityName);
			player.dayCount += 1;
			player.cash -= price;
		}
		else
		{
			window.alert("You have Sort of Money");
		}
		//cityServ.flyToCity();
		//player.dayCount += 1;
		//player.cash -= 10;
		
	};
}]);