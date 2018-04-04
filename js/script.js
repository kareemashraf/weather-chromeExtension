$(document).ready(function () {

    setTimeout(function(){
        fetchdata();
    	}, 100);

	// fetchdata();
	// console.log(getApi().query.results.channel.item.condition.temp);
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
		var uri = query+"select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+getdata().city+"')and u='"+unite+"' &format=json ";

		xhr.open("GET", uri, false);
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

    var condition = getApi().query.results.channel.item.condition.text
	var img = condition.replace(" ","_");

        $('#current .location').text(getdata().city);
	$('#current .temp').text(getApi().query.results.channel.item.condition.temp);
	$('#current .conditions').text(condition);
	$('#current .date').text(getApi().query.results.channel.item.forecast[0].day+" "+getApi().query.results.channel.item.forecast[0].date);

	if (img.toLowerCase() == 'mostly_cloudy'){
        img.toLowerCase() == 'partly_cloudy'; //because google gstatic API doesnt have this image :(
	}

    $("#img").attr("src",'https://ssl.gstatic.com/onebox/weather/128/'+img.toLowerCase()+'.png');


}


