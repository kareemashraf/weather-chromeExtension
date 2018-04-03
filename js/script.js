$(document).ready(function () {
	
	fetchdata();

});

function getdata(){
	var xhr = new XMLHttpRequest();

		xhr.open("GET", "http://ip-api.com/json", false);
		xhr.send();
		
		return JSON.parse(xhr.response); //city details

}

function getApi(){
	var xhr = new XMLHttpRequest();
		var query = "https://query.yahooapis.com/v1/public/yql?q=";
		var unite = 'c';
		xhr.open("GET", query+"select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+getdata().city+"')and u='"+unite+"' &format=json ", false);
		xhr.send();
		// console.log(xhr.response);
		return JSON.parse(xhr.response);
}

function fetchdata(){
	//convert getdata() obj to array
	var array = $.map(getdata(), function(value, index) {
    		return [value];
		});

	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}

	$('#current .location').text(getdata().city);
}


