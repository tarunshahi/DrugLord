'use strict';

drugLord.service('cityService',['drugService',function(dcs){
	var scope = this;
	scope.cities = [{name:"Austin, USA",price:Math.round(603/2)}, {name:"Beijing, China",price:Math.round(7040/2)}, {name:"Boston, USA",price:Math.round(3000/2)},{name: "Detroit,USA",price:Math.round(312/2)},{name: "London, England",price:Math.round(800/2)},{name: "Los Angeles, USA",price:Math.round(2668/2)},{name: "Miami, USA",price:Math.round(420/2)},{name: "Moscow, Russia",price:Math.round(4872/2)},{name: "New York, USA",price:Math.round(3384/2)},{name: "Paris, France",price:Math.round(3384/2)},{name: "San Francisco, USA",price:Math.round(2340/2)},{name: "St. Peteresburg, Russia",price:Math.round(4468/2)}, {name:"Sydney, Australia",price:Math.round(8730/2)}, {name:"Toronto, Canada",price:Math.round(380/2)}, {name:"Vancouver, Canada",price:Math.round(352/2)}];

	scope.initCities = function() {
		console.log("initcities");
		scope.init();
	};

	scope.init = function() {
		scope.cityObjs = [];
		for(var i = 0, n = scope.cities.length; i < n; i++) {
			scope.cityObjs.push(
				{
					name : scope.cities[i].name,
					distance: scope.cities[i].price,
					drugs : dcs.getDrugs(), 
					market : dcs.initMarket(), 
					isHere : false
				}
			);
		}
		console.log(scope.cityObjs);
		scope.currCity = scope.cityObjs[0];
		scope.currCity.isHere = true;
	};

	scope.flyToCity = function(cityName) {
		scope.init();
		for(var i =0, n = scope.cityObjs.length; i < n; i++) {
			if (scope.cityObjs[i].name == cityName) {
				scope.currCity = scope.cityObjs[i];
				scope.currCity.isHere = true;
				continue;
			};
			scope.cityObjs[i].isHere = false;
		}
	};

	scope.getCityNames = function() {
			var arr = new Array();
			var currentCityIndex=scope.getCurrentCityIndex();
			for(var i =0, n = scope.cityObjs.length; i < n; i++) {
				if(scope.cityObjs[i].isHere) {
					continue;
				}
				arr.push({name:scope.cityObjs[i].name,price:Math.round(Math.sqrt(Math.pow(scope.cityObjs[i].distance,2)+Math.pow(scope.cityObjs[currentCityIndex].distance,2)))});
			}
			console.log(arr);
		return arr;
	};
	scope.getCurrentCityIndex=function(){
		var index=0;
		for(var i =0, n = scope.cityObjs.length; i < n; i++)
		{
			if(scope.cityObjs[i].isHere)
			{
				break;
			}
				index++;
		}
		return index;
	};

	scope.getCityObjs = function() {
		return scope.cityObjs;
	};


	scope.prevTarget = null;
    scope.selectedDrug = function(e,index) {
        //first mark all selected value to false
        for(var i=0; i < scope.currCity.market.length; i++) {
            scope.currCity.market[i].selected = false;
        }

        //mark the selected index drug as true
        scope.currCity.market[index].selected = true;

        //if item is selected for the first time
        if(scope.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        } 
        // if the same item is selected, deselect it and mark selected as false
        else if(scope.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                e.currentTarget.className = "list-group-item";
                scope.currCity.market[index].selected = false;
            } else {
                e.currentTarget.className = "list-group-item active";
                scope.currCity.market[index].selected = true;
            }
        }
        //change previous item class and update current one
        else {
            scope.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        }
    };

}]);